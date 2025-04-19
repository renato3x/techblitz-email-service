import { Injectable } from '@nestjs/common';
import { AppLogger } from '../interfaces/app-logger.interface';
import pino from 'pino';

@Injectable()
export class PinoAppLoggerService implements AppLogger {
  private readonly logger = pino({
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: { colorize: true },
          level: 'debug',
        },
        {
          target: 'pino/file',
          options: { destination: 'app.log' },
          level: 'debug',
        },
      ],
    },
  });

  info(message: string, context?: string): void {
    this.logger.info({ context }, message);
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error({ context, trace }, message);
  }

  warn(message: string, context?: string): void {
    this.logger.warn({ context }, message);
  }
}
