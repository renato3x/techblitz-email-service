import { APP_LOGGER_SERVICE } from '@/app-logger/app-logger.constants';
import { AppLogger } from '@/app-logger/interfaces/app-logger.interface';
import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common';
import { RmqContext, RpcException } from '@nestjs/microservices';
import { Message } from 'amqplib';
import { ZodValidationException } from 'nestjs-zod';

@Catch(Error)
export class ErrorHandlerFilter<T extends Error> implements ExceptionFilter {
  constructor(
    @Inject(APP_LOGGER_SERVICE)
    private readonly logger: AppLogger,
  ) {}

  catch(exception: T, host: ArgumentsHost) {
    const rpc = host.switchToRpc();
    const context = rpc.getContext<RmqContext>();
    const pattern = context.getPattern();
    const message = context.getMessage() as Message;

    const baseMeta = {
      pattern,
      id: message.properties.correlationId,
      payload: message.content.toString(),
      trace: exception.stack,
    };

    if (exception instanceof ZodValidationException) {
      const errors = exception.getZodError().errors.map((error) => error.message);

      this.logger.error('Validation error', {
        context: ErrorHandlerFilter.name,
        meta: {
          ...baseMeta,
          message: 'Validation error',
          errors,
        },
      });

      return;
    }

    if (exception instanceof RpcException) {
      const error = exception.getError();

      this.logger.error('RPC error', {
        context: ErrorHandlerFilter.name,
        meta: {
          pattern,
          ...(typeof error === 'string' ? { message: error } : error),
        },
      });

      return;
    }

    this.logger.error('Unexpected error', {
      context: ErrorHandlerFilter.name,
      meta: {
        ...baseMeta,
        message: exception.message,
      },
    });
  }
}
