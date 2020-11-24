import { Controller, OnModuleInit } from '@nestjs/common';
import { grpcClientOptions } from '../grpc-client.options';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface OrdersService {
  list(): Observable<any>;
}

@Controller()
export class OrdersController implements OnModuleInit {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;
  private ordersService: OrdersService;

  onModuleInit(): any {
    this.ordersService = this.client.getService('OrdersService');
  }

  @GrpcMethod('OrdersService')
  list() {
    return {};
  }
}
