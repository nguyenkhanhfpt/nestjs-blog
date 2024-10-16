import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTag } from './entities/blog-tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogTag])],
})
export class BlogTagsModule {}
