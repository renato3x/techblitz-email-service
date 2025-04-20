import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppLoggerAdapter } from './app-logger/adapters/app-logger.adapter';
import { AppLoggerFactory } from './app-logger/app-logger.factory';

async function bootstrap() {
  const AppLogger = AppLoggerFactory.getAppLogger(process.env.APP_LOGGER_PROVIDER);
  const logger = new AppLoggerAdapter(new AppLogger());

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    logger: logger,
    options: {
      urls: [process.env.BROKER_URL],
      queue: process.env.QUEUE_NAME,
      persistent: true,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
}

bootstrap();
