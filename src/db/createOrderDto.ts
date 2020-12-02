import { OrderStatus } from './entities/orders.entity';

export class CreateOrderDto {
  cents: number;
}

export class UpdateOrderDto {
  orderId: number;
  newStatus: OrderStatus;
}
