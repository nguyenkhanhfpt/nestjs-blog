import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DataSource } from 'typeorm';
import { Blog } from '../entities/blog.entity';

@Injectable()
export class UpdateGuard implements CanActivate {
  constructor(@Inject(DataSource) private readonly dataSource: DataSource) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let { id } = request.params;
    let blog = await this.dataSource
      .getRepository(Blog)
      .findOne({ where: { id }, relations: ['user'] });

    if (blog?.user && blog?.user.id != request.user['sub']) {
        return false;
    }

    return true;
  }
}
