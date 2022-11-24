import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { grpcClientOptions } from './grpc-client.options';
import { extendedGrpcOptions } from 'grpc-health/dist/health/health-grpc-client.options';
import { GrpcOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as LogRocket from 'logrocket';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Uni Order System')
    .setDescription('All about orders')
    .setVersion('1.0')
    .addTag('uni-orders')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice(
    extendedGrpcOptions(grpcClientOptions as GrpcOptions),
  );

  await app.startAllMicroservices();

  app.enableShutdownHooks();

  app.enableCors();

  await app.listen(3000, '0.0.0.0');
}

LogRocket.init('ch20tr/uni-orders');
bootstrap();
