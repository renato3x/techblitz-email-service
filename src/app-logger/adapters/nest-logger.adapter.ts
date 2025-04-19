import { LoggerService } from '@nestjs/common';
import { AppLogger } from '../interfaces/app-logger.interface';

export class NestLoggerAdapter implements LoggerService {
  constructor(private readonly logger: AppLogger) {}

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, { context: optionalParams[0] });
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.info(message, { context: optionalParams[0] });
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.info(message, { context: optionalParams[0] });
  }
}
