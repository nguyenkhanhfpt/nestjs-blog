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
import { RequestFollowService } from 'src/request-follow/request-follow.service';

@Controller('follows')
export class FollowsController {
  constructor(
    private userService: UsersService,
    private followsService: FollowsService,
    private eventEmitter: EventEmitter2,
    private requestFollowService: RequestFollowService,
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
    let follow = null;
    let event = null;

    if (followUser.isPrivate) {
      follow = await this.requestFollowService.create({
        user: user,
        requestUser: followUser,
      });
      event = 'request.follow.user';
    } else {
      follow = await this.followsService.create({
        follower: user,
        following: followUser,
      });
      event = 'follow.user';
    }

    this.eventEmitter.emitAsync(
      event,
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

  @Post('/accept-follow/:id')
  async acceptFollow(@Req() req: Request, @Param('id') id: number) {
    const user = await this.userService.findOneBy({
      where: {
        id: req['user']['sub'],
      },
    });
    const userRequest = await this.userService.findOne(id);

    let requestFollow = await this.requestFollowService.findOneBy({
      where: {
        user: userRequest,
        requestUser: user,
      },
    });

    if (!requestFollow) {
      throw new BadRequestException();
    }

    await this.requestFollowService.remove(requestFollow.id);

    let follow = await this.followsService.create({
      follower: userRequest,
      following: user,
    });

    this.eventEmitter.emitAsync(
      'accept.request.follow.user',
      new FollowEvent({
        sender: user,
        targetUser: userRequest,
      }),
    );

    return follow;
  }
}
