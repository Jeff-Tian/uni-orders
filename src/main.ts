import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { grpcClientOptions } from './grpc-client.options';
import { extendedGrpcOptions } from 'grpc-health/dist/health/health-grpc-client.options';
import { GrpcOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.connectMicroservice(
    extendedGrpcOptions(grpcClientOptions as GrpcOptions),
  );

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
