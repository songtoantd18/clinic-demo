import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LifecycleGuard implements CanActivate {
  private readonly logger = new Logger('Lifecycle');

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const handler = context.getHandler().name; // Tên function handler, vd: 'create'
    const className = context.getClass().name;  // Tên Controller, vd: 'AppointmentController'
    const user = req.user;

    this.logger.log(
      `2. [Guard] ${className}.${handler}() | User: ${user?.email ?? 'chưa xác thực'} | Role: ${user?.role ?? 'N/A'}`
    );
    return true;
  }
}
