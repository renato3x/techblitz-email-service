import { APP_LOGGER_SERVICE } from '@/app-logger/app-logger.constants';
import { AppLogger } from '@/app-logger/interfaces/app-logger.interface';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor(
    @Inject(APP_LOGGER_SERVICE)
    private readonly logger: AppLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rpc = context.switchToRpc();
    const ctx = rpc.getContext<RmqContext>();
    const pattern = ctx.getPattern();
    const meta = {
      pattern,
      handler: context.getHandler().name,
      class: context.getClass().name,
    };

    this.logger.info(`Handling message '${pattern}'`, { context: RequestInterceptor.name, meta });

    return next.handle().pipe(
      tap(() => {
        this.logger.info(`Message '${pattern}' handled successfully`, { context: RequestInterceptor.name, meta });
      }),
    );
  }
}
