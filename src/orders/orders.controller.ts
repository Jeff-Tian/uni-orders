import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IOrdersService } from './IOrdersService';
import { symbols } from '../constants';
import { CreateOrderDto } from '../db/createOrderDto';

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

  @GrpcMethod('OrdersService')
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
}
