import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Blog, BlogStatus } from '../entities/blog.entity';

@Injectable()
export class AccessBlogGuard implements CanActivate {
  constructor(@Inject(DataSource) private dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request = context.switchToHttp().getRequest();
    let { id } = request.params;
    let blog = await this.dataSource
      .getRepository(Blog)
      .findOne({ where: { id }, relations: ['user'] });

    if (
      blog?.user &&
      blog.isPublic == BlogStatus.PRIVATE &&
      blog?.user.id != request.user['sub']
    ) {
      return false;
    }

    return true;
  }
}
