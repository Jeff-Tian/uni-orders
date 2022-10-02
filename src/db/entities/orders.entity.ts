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

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: '订单编号' })
  number: string;

  @Column({})
  @ApiProperty()
  cents: number;

  @Column({})
  @ApiProperty({ description: '随机优惠金额' })
  randomDiscountCents: number;

  @Column()
  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  status: OrderStatus;

  @Column()
  @ApiProperty()
  created_at: Date;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  paid_at?: Date;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  cancelled_at?: Date;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  timeout_at?: Date;

  @Column()
  @ApiProperty()
  remark: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  type: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  paymentMethod: string;

  @OneToMany((type) => Payment, (payment) => payment.order_id)
  @JoinColumn()
  payment: Payment;
}
