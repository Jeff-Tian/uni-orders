import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from './orderStatus';
import { Payment } from './payments.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @Field((type) => Int)
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: '订单编号' })
  @Field({ description: '订单编号' })
  number: string;

  @Column({})
  @ApiProperty()
  @Field()
  cents: number;

  @Column({})
  @ApiProperty({ description: '随机优惠金额' })
  @Field()
  randomDiscountCents: number;

  @Column()
  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  @Field()
  status: OrderStatus;

  @Column()
  @ApiProperty()
  @Field()
  created_at: Date;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  @Field()
  paid_at?: Date;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  @Field()
  cancelled_at?: Date;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  @Field()
  timeout_at?: Date;

  @Column()
  @ApiProperty()
  @Field()
  remark: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  @Field()
  type: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  @Field()
  paymentMethod: string;

  @OneToMany((type) => Payment, (payment) => payment.order_id)
  @JoinColumn()
  payment: Payment;
}
