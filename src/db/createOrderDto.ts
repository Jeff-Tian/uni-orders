import { OrderStatus } from './entities/orders.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  cents: number;
}

export class UpdateOrderDto {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  newStatus: OrderStatus;
}
