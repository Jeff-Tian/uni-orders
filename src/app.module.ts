import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from 'grpc-health/dist/health/health.module';
import { grpcClientOptions } from './grpc-client.options';
import { GrpcOptions } from '@nestjs/microservices';
import { OrdersModule } from './orders/orders.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { ConfigModule } from '@nestjs/config';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import {
  MercuriusFederationDriver,
  MercuriusFederationDriverConfig,
} from '@nestjs/mercurius';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    HealthModule.register(grpcClientOptions as GrpcOptions),
    OrdersModule,
    TerminusModule,
    ShoppingCartModule,
    GraphQLModule.forRoot<MercuriusFederationDriverConfig>({
      driver: MercuriusFederationDriver,
      autoSchemaFile: true,
      graphiql: true,
      federationMetadata: true,
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
