import { Module } from '@nestjs/common';
import { RequestFollowService } from './request-follow.service';
import { RequestFollowController } from './request-follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestFollow } from './entities/request-follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestFollow])],
  controllers: [RequestFollowController],
  providers: [RequestFollowService],
  exports: [RequestFollowService]
})
export class RequestFollowModule {}
