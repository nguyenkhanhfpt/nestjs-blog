import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCategories } from './entities/blog-categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogCategories])],
})
export class BlogCategoriesModule {}
