import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign_up.dto';
import { SignInDto } from './dto/sign_in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const hash = await this.hashData(signUpDto.password);
    let user = await this.userService.create({
      ...signUpDto,
      password: hash,
    });

    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    let user = await this.userService.findOneBy({
      where: { email },
    });

    if (!user) throw new BadRequestException('User does not exist');

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user.id, user.username);
    this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async logout(userId: number) {
    return await this.userService.update(userId, {
      refreshToken: null,
    });
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: '59m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId, refreshToken) {
    let user = await this.userService.findOne(userId);

    if (!user) throw new BadRequestException('User does not exist');

    let refreshTokenMatch = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatch) throw new BadRequestException('Access Denied');

    const tokens = await this.getTokens(user.id, user.username);
    this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }
}
