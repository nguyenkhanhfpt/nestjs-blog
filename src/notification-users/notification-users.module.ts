import { Module } from '@nestjs/common';
import { NotificationUsersService } from './notification-users.service';
import { NotificationUsersController } from './notification-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationUser } from './entities/notification-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationUser])],
  controllers: [NotificationUsersController],
  providers: [NotificationUsersService],
})
export class NotificationUsersModule {}
