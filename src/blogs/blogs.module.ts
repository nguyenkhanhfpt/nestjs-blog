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

@Module({
  imports: [
    UsersModule,
    CacheModule,
    CategoriesModule,
    BlogCategoriesModule,
    NotificationsModule,
    TypeOrmModule.forFeature([Blog])
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogCreatedListener],
})
export class BlogsModule {}
