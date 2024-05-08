import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BaseService } from 'src/common/service/base.services';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog, BlogStatus } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import * as slug from 'slug';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class BlogsService extends BaseService {
  private readonly logger = new Logger(BaseService.name);

  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
  ) {
    super();
    this.setRepository();
  }

  setRepository() {
    this.repository = this.blogRepository;
  }

  async createBlog(user: User, createBlogDto: CreateBlogDto) {
    this.logger.log(`Create blog by userId: ${user.id}`);

    return await this.create({
      ...createBlogDto,
      slug: this.getBlogSlug(createBlogDto.title),
      user,
    });
  }

  async updateBlog(id: number, updateBlogDto: UpdateBlogDto) {
    let slug = updateBlogDto?.title
      ? { slug: this.getBlogSlug(updateBlogDto.title) }
      : {};

    return await this.update(id, {
      ...updateBlogDto,
      ...slug,
    });
  }

  getBlogSlug(value): string {
    return slug(value);
  }

  async getBlogsByUser(id: number) {
    let isPublic = BlogStatus.PUBLIC;

    return await this.getRepository()
      .createQueryBuilder('blog')
      .innerJoin('blog.user', 'u')
      .where('u.id = :id', { id })
      .andWhere('blog.isPublic = :isPublic', { isPublic })
      .getMany();
  }
}
