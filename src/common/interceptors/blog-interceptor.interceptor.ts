import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Blog } from 'src/blogs/entities/blog.entity';

@Injectable()
export class BlogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log(`After... ${Date.now() - now}ms`);
      }),
      map((data) =>
        data.map((item: Blog) => {
          const res = {
            ...item,
            title: 'Title: ' + item.title,
          };

          return res;
        }),
      ),
    );
  }
}
