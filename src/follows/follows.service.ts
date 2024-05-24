import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/service/base.services';
import { Follows } from './entities/follows.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FollowsService extends BaseService {
  constructor(
    @InjectRepository(Follows) private followsRepository: Repository<Follows>,
  ) {
    super();
    this.setRepository();
  }

  setRepository() {
    this.repository = this.followsRepository;
  }

  isFollowedUser(user: User, followingId: number): boolean {
    return (user?.followingList || []).some((following) => {
        return following.followingId == followingId;
    });
  }

  async unFollowUser(follower: User, following: User) {
    return await this.getRepository().delete({
      follower,
      following
    });
  }
}
