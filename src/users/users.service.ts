import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/service/base.services';
import { Follows } from 'src/follows/entities/follows.entity';

@Injectable()
export class UsersService extends BaseService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super();
    this.setRepository();
  }

  setRepository() {
    this.repository = this.userRepository;
  }

  getFollowers(user: User) {
    return this.getRepository()
      .createQueryBuilder('user')
      .innerJoin(Follows, 'follow', 'follow.followerId = user.id')
      .where('follow.followingId = :id', { id: user.id })
      .getMany();
  }
}
