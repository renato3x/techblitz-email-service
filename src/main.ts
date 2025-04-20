import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppLogger } from './app-logger/interfaces/app-logger.interface';
import { APP_LOGGER_SERVICE } from './app-logger/app-logger.constants';
import { NestLoggerAdapter } from './app-logger/adapters/nest-logger.adapter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.BROKER_URL],
      queue: process.env.QUEUE_NAME,
      persistent: true,
      queueOptions: {
        durable: true,
      },
    },
  });

  const logger = app.get<AppLogger>(APP_LOGGER_SERVICE);
  const loggerAdapter = new NestLoggerAdapter(logger);

  app.useLogger(loggerAdapter);
  await app.listen();
}

bootstrap();
