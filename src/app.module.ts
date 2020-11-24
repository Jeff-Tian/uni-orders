import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from 'grpc-health/dist/health/health.module';
import { grpcClientOptions } from './grpc-client.options';
import { GrpcOptions } from '@nestjs/microservices';

@Module({
  imports: [HealthModule.register(grpcClientOptions as GrpcOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
