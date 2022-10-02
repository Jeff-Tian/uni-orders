import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './orders.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  transaction_id: string;

  @Column()
  @ApiProperty()
  trade_state: number;

  @Column()
  @ApiProperty()
  pay_time: number;

  @Column()
  @ApiProperty()
  out_trade_no: string;

  @Column()
  @ApiProperty()
  external_userid: string;

  @Column()
  @ApiProperty()
  total_fee: number;

  @Column()
  @ApiProperty()
  payee_userid: string;

  @Column()
  @ApiProperty()
  payment_type: number;

  @Column()
  @ApiProperty()
  mch_id: string;

  @Column()
  @ApiProperty()
  remark: string;

  @Column()
  @ApiProperty()
  total_refund_fee: number;

  @Column()
  @ApiProperty()
  order_id: number;

  @ManyToOne((type) => Order, (order) => order.id)
  @JoinColumn()
  order: Order;
}
