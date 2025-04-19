import { APP_LOGGER_SERVICE } from '@/app-logger/app-logger.constants';
import { AppLogger } from '@/app-logger/interfaces/app-logger.interface';
import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common';
import { RmqContext, RpcException } from '@nestjs/microservices';
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
    const logMessage = `Error handling message '${pattern}'`;

    if (exception instanceof ZodValidationException) {
      const errors = exception.getZodError().errors.map((error) => error.message);

      this.logger.error(logMessage, {
        context: ErrorHandlerFilter.name,
        meta: {
          pattern,
          message: 'Validation error',
          trace: exception.stack,
          errors,
        },
      });

      return;
    }

    if (exception instanceof RpcException) {
      const error = exception.getError();

      this.logger.error(logMessage, {
        context: ErrorHandlerFilter.name,
        meta: {
          pattern,
          ...(typeof error === 'string' ? { message: error } : error),
          trace: exception.stack,
        },
      });

      return;
    }

    this.logger.error(logMessage, {
      context: ErrorHandlerFilter.name,
      meta: {
        pattern,
        message: exception.message,
        trace: exception.stack,
      },
    });
  }
}
