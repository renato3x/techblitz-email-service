import { LoggerService } from '@nestjs/common';
import { AppLogger } from '../interfaces/app-logger.interface';

export class NestLoggerAdapter implements LoggerService {
  constructor(private readonly logger: AppLogger) {}

  log(message: any) {
    this.logger.info(message);
  }

  error(message: any) {
    this.logger.error(message);
  }

  warn(message: any) {
    this.logger.warn(message);
  }
}
