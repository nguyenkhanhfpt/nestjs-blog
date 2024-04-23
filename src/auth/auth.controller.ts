import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign_up.dto';
import * as argon2 from 'argon2';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({transform: true}))
  async signUp(@Body() signUpDto: SignUpDto) {
    const hash = await this.hashData(signUpDto.password);

    let user = await this.userService.create({
        ...signUpDto,
        password: hash
    });

    return user;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
