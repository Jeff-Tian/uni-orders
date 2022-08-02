import { OrderStatus } from './entities/orders.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  cents: number;

  @ApiProperty()
  remark: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  paymentMethod: string;
}

export class UpdateOrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: OrderStatus;
}
