import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.EMAIL_SERVICE_BROKER_URL],
      queue: process.env.EMAIL_SERVICE_QUEUE_NAME,
      persistent: true,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
}
bootstrap();
