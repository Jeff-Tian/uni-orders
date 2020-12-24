import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { IOrdersService } from './IOrdersService';
import { symbols } from '../constants';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../db/entities/orders.entity';
import { CreateOrderDto } from '../db/createOrderDto';
import assert = require('assert');
import * as util from 'util';

@Injectable()
export class OrdersService implements IOrdersService {
  private readonly logger = new Logger(OrdersService.name);

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

  async getById(orderId: number): Promise<Order> {
    return this.orderRepo.findOneOrFail(orderId);
  }

  async create(order: CreateOrderDto): Promise<Order> {
    try {
      assert.ok(order.cents);
    } catch (ex) {
      this.logger.error(ex.message, ex.stack, util.inspect(order));
      throw new HttpException({ order, ex }, 400);
    }

    const entity = this.orderRepo.create(({
      ...order,
      randomDiscountCents: this.getRandomDiscountCents(order.cents),
      number: this.generateOrderNumber(),
      status: OrderStatus.Created,
      created_at: new Date(),
    } as unknown) as Order);

    return await this.saveOrFail(entity);
  }

  private getRandomDiscountCents(cents: number) {
    return 1 + Math.floor(Math.random() * cents);
  }
}
