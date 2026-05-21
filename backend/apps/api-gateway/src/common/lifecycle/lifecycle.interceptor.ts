import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LifecycleInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Lifecycle');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { method, url } = req;

    this.logger.log(`3. [Interceptor↓] ${method} ${url} | Chuẩn bị vào Controller`);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        this.logger.log(
          `6. [Interceptor↑] ${method} ${url} | Status: ${res.statusCode} | ${duration}ms`
        );
      }),
    );
  }
}
