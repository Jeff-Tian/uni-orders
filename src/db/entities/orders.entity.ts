import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
  Created,
  Paid,
  Cancelled,
  Timeout,
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number: string;

  @Column({})
  cents: number;

  @Column({})
  randomDiscountCents: number;

  @Column()
  status: OrderStatus;

  @Column()
  created_at: Date;

  @Column({
    nullable: true,
  })
  paid_at?: Date;

  @Column({
    nullable: true,
  })
  cancelled_at?: Date;

  @Column({
    nullable: true,
  })
  timeout_at?: Date;

  @Column()
  remark: string;
}
