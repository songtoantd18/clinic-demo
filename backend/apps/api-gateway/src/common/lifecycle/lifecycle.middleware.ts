import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LifecycleMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Lifecycle');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, ip } = req;
    const userAgent = req.get('user-agent') || 'unknown';
    this.logger.log(
      `1. [Middleware] ${method} ${url} | IP: ${ip} | Agent: ${userAgent.substring(0, 30)}`
    );
    next();
  }
}
