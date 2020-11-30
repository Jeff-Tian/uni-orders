import { Controller, Get, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IOrdersService } from './IOrdersService';
import { symbols } from '../constants';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(symbols.IOrdersService) private ordersService: IOrdersService,
  ) {}

  @GrpcMethod('OrdersService')
  @Get()
  list() {
    return this.ordersService.findAll();
  }
}
