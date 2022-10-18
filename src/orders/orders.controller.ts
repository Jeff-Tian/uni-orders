import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IOrdersService } from './IOrdersService';
import { symbols } from '../constants';
import * as halson from 'halson';
import * as util from 'util';
import { CreateOrderDto, UpdateOrderDto } from '../db/create.order.dto';
import { OrderStatus } from '../db/entities/orderStatus';

@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);

  constructor(
    @Inject(symbols.IOrdersService) private ordersService: IOrdersService,
  ) {}

  @GrpcMethod('OrdersService')
  @Get()
  async list() {
    return halson({ data: await this.ordersService.findAll() });
  }

  @GrpcMethod('OrdersService')
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.ordersService.getById(id);
  }

  @GrpcMethod('OrdersService')
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(
      typeof createOrderDto === 'string'
        ? JSON.parse(createOrderDto)
        : createOrderDto,
    );
  }

  @GrpcMethod('OrdersService')
  @Patch()
  update(@Body() updateOrderDto: UpdateOrderDto) {
    this.logger.log(
      `got updating request for ${typeof updateOrderDto}`,
      util.inspect(updateOrderDto),
    );

    if (typeof updateOrderDto === 'string') {
      updateOrderDto = JSON.parse(updateOrderDto);
    }
    const orderStatusString = OrderStatus[updateOrderDto.status.toString()];

    return this.ordersService.update(
      updateOrderDto.id,
      OrderStatus[orderStatusString] as any,
    );
  }
}
