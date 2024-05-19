import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCategories } from './entities/blog-categories.entity';
import { BlogCategoriesService } from './blog-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogCategories])],
  providers: [BlogCategoriesService],
  exports: [BlogCategoriesService],
})
export class BlogCategoriesModule {}
