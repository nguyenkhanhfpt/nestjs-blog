import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogCategories } from './entities/blog-categories.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/service/base.services';
import { Blog } from 'src/blogs/entities/blog.entity';

@Injectable()
export class BlogCategoriesService extends BaseService {
  constructor(
    @InjectRepository(BlogCategories)
    private blogCategoryRepository: Repository<BlogCategories>,
  ) {
    super();
    this.setRepository();
  }

  setRepository() {
    this.repository = this.blogCategoryRepository;
  }

  async deleteByBlog(blog: Blog) {
    return await this.getRepository().delete({
      blog: blog,
    });
  }

  async createMany(blog: Blog, categories: any) {
    return categories.forEach(async (category) => {
      let blogCategory = new BlogCategories();
      blogCategory.blog = blog;
      blogCategory.category = await category;
      await this.create(blogCategory);
    });
  }
}
