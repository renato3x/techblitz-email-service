import { APP_LOGGER_SERVICE } from '@/app-logger/app-logger.constants';
import { AppLogger } from '@/app-logger/interfaces/app-logger.interface';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { Message } from 'amqplib';
import { Observable } from 'rxjs';

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
    const message = ctx.getMessage() as Message;

    const meta = {
      pattern,
      handler: context.getHandler().name,
      payload: message.content.toString(),
      id: message.properties.messageId,
      correlation_id: message.properties.correlationId,
      content_type: message.properties.contentType,
      encoding: message.properties.contentEncoding,
      message_timestamp: message.properties.timestamp,
      headers: message.properties.headers,
    };

    this.logger.info(`Handling message "${pattern}"`, { context: RequestInterceptor.name, meta });
    return next.handle();
  }
}
