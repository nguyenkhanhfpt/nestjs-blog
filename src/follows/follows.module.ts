import { Module } from '@nestjs/common';
import { FollowsController } from './follows.controller';
import { FollowsService } from './follows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follows } from './entities/follows.entity';
import { UsersModule } from 'src/users/users.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { FollowListener } from './listeners/follow.listener';

@Module({
  imports: [UsersModule, NotificationsModule, TypeOrmModule.forFeature([Follows])],
  controllers: [FollowsController],
  providers: [FollowsService, FollowListener]
})
export class FollowsModule {}
