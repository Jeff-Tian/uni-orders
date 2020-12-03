import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IOrdersService } from './IOrdersService';
import { symbols } from '../constants';
import { CreateOrderDto, UpdateOrderDto } from '../db/createOrderDto';

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
  @Get(':id')
  getById(@Param() params) {
    return this.ordersService.getById(params.id);
  }

  @GrpcMethod('OrdersService')
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @GrpcMethod('OrdersService')
  @Put()
  update(@Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(
      updateOrderDto.orderId,
      updateOrderDto.newStatus,
    );
  }
}
