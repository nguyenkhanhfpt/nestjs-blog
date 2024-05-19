import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseService } from 'src/common/service/base.services';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService extends BaseService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super();
    this.setRepository();
  }

  setRepository() {
    this.repository = this.categoryRepository;
  }

  createOrGetCategoryByConditions(categoryList, user) {
    return categoryList.map((item) => {
      if (item.id) {
        return this.findOne(item.id);
      }
      item.Creator = user;

      return this.create(item);
    });
  }
}
