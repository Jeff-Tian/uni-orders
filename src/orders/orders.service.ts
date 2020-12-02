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

  private async saveOrFail(order: Order) {
    try {
      return await this.orderRepo.save(order);
    } catch (ex) {
      throw new HttpException({ order, ex }, 400);
    }
  }

  async update(orderId: number, newStatus: OrderStatus): Promise<Order> {
    const order = await this.orderRepo.findOneOrFail(orderId);
    order.status = newStatus;

    return await this.saveOrFail(order);
  }

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

    return await this.saveOrFail(entity);
  }
}
