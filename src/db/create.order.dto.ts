import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from './entities/orderStatus';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateOrderDto {
  @ApiProperty()
  @Field((type) => Int)
  cents: number;

  @ApiProperty()
  @Field({ description: '订单备注' })
  remark: string;

  @ApiProperty()
  @Field()
  type: string;

  @ApiProperty()
  @Field()
  paymentMethod: string;
}

export class UpdateOrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: OrderStatus;
}
