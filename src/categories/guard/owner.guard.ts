import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(@Inject(DataSource) readonly dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = request.params['id'];

    const category = await this.dataSource.getRepository(Category).findOne({
      where: { id },
      relations: ['Creator'],
    });

    if (
      category &&
      category.Creator &&
      category.Creator.id != request.user['sub']
    ) {
      return false;
    }

    return true;
  }
}
