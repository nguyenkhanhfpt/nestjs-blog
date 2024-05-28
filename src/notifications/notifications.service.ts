import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { BaseService } from 'src/common/service/base.services';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { NotificationType } from 'src/notification-types/entities/notification-types.entity';
import { UsersService } from 'src/users/users.service';
import { NotificationUsersService } from 'src/notification-users/notification-users.service';

@Injectable()
export class NotificationsService extends BaseService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private userService: UsersService,
    private notificationUsersService: NotificationUsersService,
  ) {
    super();
    this.setRepository();
  }

  setRepository() {
    this.repository = this.notificationRepository;
  }

  async releaseNotification(createNotificationDto: CreateNotificationDto) {
    const notification = await this.create({
      sender: createNotificationDto.sender,
      type: createNotificationDto.type,
      additionalData: createNotificationDto.additionalData || null,
    });
    let listUsers = await this.getTargetNotification(createNotificationDto);

    listUsers.length &&
      (await this.releaseNotificationForUsers(listUsers, notification));

    return notification;
  }

  async getTargetNotification(createNotificationDto: CreateNotificationDto) {
    let targetList = [];

    switch (createNotificationDto.type) {
      case NotificationType.CREATE_BLOG:
        targetList = await this.userService.getFollowers(
          createNotificationDto.sender,
        );
        break;
      case NotificationType.FOLLOW:
        targetList = createNotificationDto.targetUser
          ? [createNotificationDto.targetUser]
          : [];
        break;
      default:
    }

    return targetList;
  }

  async releaseNotificationForUsers(users: User[], notification: Notification) {
    users.forEach(async (user) => {
      await this.notificationUsersService.create({
        user,
        notification,
      });
    });
  }
}
