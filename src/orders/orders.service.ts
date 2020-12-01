import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IOrdersService } from './IOrdersService';
import { symbols } from '../constants';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../db/entities/orders.entity';
import { CreateOrderDto } from '../db/createOrderDto';
import assert = require('assert');

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @Inject(symbols.ORDERS_REPOSITORY) private orderRepo: Repository<Order>,
  ) {}

  generateOrderNumber() {
    const now = Date.now();
    const time = new Date(now);

    return `${time.toISOString().substr(0, 10)}-${now.toString().substr(5)}`;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  async create(order: CreateOrderDto): Promise<Order> {
    try {
      assert.ok(order.cents);
    } catch (ex) {
      throw new HttpException({ order, ex }, 400);
    }

    const entity = this.orderRepo.create(({
      ...order,
      number: this.generateOrderNumber(),
      status: OrderStatus.Created,
      created_at: new Date(),
    } as unknown) as Order);

    try {
      return await this.orderRepo.save(entity);
    } catch (ex) {
      throw new HttpException({ order, ex }, 400);
    }
  }
}
