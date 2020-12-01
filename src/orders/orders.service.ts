import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IOrdersService } from './IOrdersService';
import { symbols } from '../constants';
import { Repository } from 'typeorm';
import { Order } from '../db/entities/orders.entity';
import { CreateOrderDto } from '../db/createOrderDto';
import assert = require('assert');

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @Inject(symbols.ORDERS_REPOSITORY) private orderRepo: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  async create(order: CreateOrderDto): Promise<Order> {
    try {
      assert.ok(order.cents);
    } catch (ex) {
      throw new HttpException({ order, ex }, 400);
    }

    const entity = this.orderRepo.create((order as unknown) as Order);

    try {
      return await this.orderRepo.save(entity);
    } catch (ex) {
      throw new HttpException({ order, ex }, 400);
    }
  }
}
