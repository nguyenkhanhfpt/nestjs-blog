import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FollowEvent } from '../events/follow.event';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType } from 'src/notification-types/entities/notification-types.entity';

@Injectable()
export class FollowListener {
  constructor(private notificationService: NotificationsService) {}

  @OnEvent('follow.user')
  handleFollowUserEvent(followEvent: FollowEvent) {
    this.notificationService.releaseNotification({
      type: NotificationType.FOLLOW,
      sender: followEvent.sender,
      targetUser: followEvent.targetUser,
    });
  }
}
