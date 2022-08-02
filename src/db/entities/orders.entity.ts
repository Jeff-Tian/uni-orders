import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  Created,
  Paid,
  Cancelled,
  Timeout,
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  number: string;

  @Column({})
  @ApiProperty()
  cents: number;

  @Column({})
  @ApiProperty()
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
}
