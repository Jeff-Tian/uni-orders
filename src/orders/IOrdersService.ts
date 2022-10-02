import { Order} from '../db/entities/orders.entity';
import { CreateOrderDto } from '../db/create.order.dto';
import {OrderStatus} from "../db/entities/orderStatus";

export interface IOrdersService {
  findAll(): Promise<Order[]>;

  create(createOrderDto: CreateOrderDto): Promise<Order>;

  update(orderId: number, newStatus: OrderStatus): Promise<Order>;

  getById(orderId: number): Promise<Order>;
}
