import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { UsersModule } from 'src/users/users.module';
import { CacheModule } from 'src/common/module/cache.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { BlogCategoriesModule } from 'src/blog-categories/blog-categories.module';
import { BlogCreatedListener } from './listeners/blog-created.listener';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { BullModule } from '@nestjs/bull';
import { BlogProcessor } from './blog.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'blogs',
    }),
    UsersModule,
    CacheModule,
    CategoriesModule,
    BlogCategoriesModule,
    NotificationsModule,
    TypeOrmModule.forFeature([Blog]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogCreatedListener, BlogProcessor],
})
export class BlogsModule {}
