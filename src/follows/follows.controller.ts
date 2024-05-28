import {
  BadRequestException,
  Controller,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { FollowsService } from './follows.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FollowEvent } from './events/follow.event';

@Controller('follows')
export class FollowsController {
  constructor(
    private userService: UsersService,
    private followsService: FollowsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post(':id')
  async follow(@Req() req: Request, @Param('id') id: number) {
    const user = await this.userService.findOneBy({
      where: {
        id: req['user']['sub'],
      },
      relations: ['followingList'],
    });
    const followUser = await this.userService.findOne(id);

    if (this.followsService.isFollowedUser(user, id)) {
      throw new BadRequestException();
    }

    let follow = await this.followsService.create({
      follower: user,
      following: followUser,
    });

    this.eventEmitter.emitAsync(
      'follow.user',
      new FollowEvent({
        sender: user,
        targetUser: followUser,
      }),
    );

    return follow;
  }

  @Post('/un-follow/:id')
  async unFollow(@Req() req: Request, @Param('id') id: number) {
    const user = await this.userService.findOneBy({
      where: {
        id: req['user']['sub'],
      },
      relations: ['followingList'],
    });
    const unFollowUser = await this.userService.findOne(id);

    if (!this.followsService.isFollowedUser(user, id)) {
      throw new BadRequestException();
    }

    await this.followsService.unFollowUser(user, unFollowUser);

    return unFollowUser;
  }
}
