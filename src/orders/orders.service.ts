import { Injectable } from '@nestjs/common';
import { IOrdersService } from './IOrdersService';
import { IOrder } from './IOrder';

@Injectable()
export class OrdersService implements IOrdersService {
  private readonly orders: IOrder[] = [];

  async findAll(): Promise<IOrder[]> {
    return this.orders;
  }
}
