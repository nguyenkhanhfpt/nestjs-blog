import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogCategories } from './entities/blog-categories.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/service/base.services';

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
}
