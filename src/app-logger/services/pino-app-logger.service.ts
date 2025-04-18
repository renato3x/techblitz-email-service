import { Injectable } from '@nestjs/common';
import { AppLogger } from '../interfaces/app-logger.interface';
import { PrettyOptions } from 'pino-pretty';
import pino, { Logger, LoggerOptions } from 'pino';

@Injectable()
export class PinoAppLoggerService implements AppLogger {
  private readonly options: Record<string, LoggerOptions> = {
    development: {
      transport: {
        targets: [
          {
            target: 'pino-pretty',
            level: 'debug',
            options: {
              colorize: true,
            } as PrettyOptions,
          },
          {
            target: 'pino/file',
            level: 'debug',
            options: {
              destination: 'app.log',
              append: false,
            },
          },
        ],
      },
    },
    production: {
      transport: {
        targets: [
          {
            target: 'pino-pretty',
            level: 'info',
            options: {
              colorize: true,
            } as PrettyOptions,
          },
          {
            target: 'pino/file',
            level: 'info',
            options: {
              destination: 'app.log',
              append: false,
            },
          },
        ],
      },
    },
  };

  private readonly logger: Logger;

  constructor() {
    this.logger = pino(this.options[process.env.NODE_ENV]);
  }

  info(message: string, meta: AppLogger.LogMetadata): void {
    this.logger.info(meta, message);
  }

  error(message: string, meta: AppLogger.LogMetadata): void {
    this.logger.error(meta, message);
  }

  warn(message: string, meta: AppLogger.LogMetadata): void {
    this.logger.warn(meta, message);
  }
}
