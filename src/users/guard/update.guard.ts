import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export default class UpdateGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let { id } = request.params;
    let currentUserId = parseInt(request.user['sub']);

    return currentUserId === parseInt(id);
  }
}
