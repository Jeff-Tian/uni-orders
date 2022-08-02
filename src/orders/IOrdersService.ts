import { Order, OrderStatus } from '../db/entities/orders.entity';
import { CreateOrderDto } from '../db/create.order.dto';

export interface IOrdersService {
  findAll(): Promise<Order[]>;

  create(createOrderDto: CreateOrderDto): Promise<Order>;

  update(orderId: number, newStatus: OrderStatus): Promise<Order>;

  getById(orderId: number): Promise<Order>;
}
