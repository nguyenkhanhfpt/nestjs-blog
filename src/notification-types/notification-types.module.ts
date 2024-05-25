import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationTypes } from './entities/notification-types.entity';

@Module({
    imports: [TypeOrmModule.forFeature([NotificationTypes])]
})
export class NotificationTypesModule {
}
