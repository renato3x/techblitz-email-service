import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: process.env.MESSAGE_BROKER_QUEUE_NAME,
      persistent: true,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
}
bootstrap();
