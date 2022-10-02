import { ApiProperty } from '@nestjs/swagger';
import {OrderStatus} from "./entities/orderStatus";

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
