import { Injectable } from '@nestjs/common';
import { CreateNotificationUserDto } from './dto/create-notification-user.dto';
import { UpdateNotificationUserDto } from './dto/update-notification-user.dto';
import { BaseService } from 'src/common/service/base.services';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationUser } from './entities/notification-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationUsersService extends BaseService{
  constructor(
    @InjectRepository(NotificationUser) private notificationUserRepository: Repository<NotificationUser> 
  ) {
    super();
    this.setRepository();
  }

  setRepository() {
    this.repository = this.notificationUserRepository;
  }
}
