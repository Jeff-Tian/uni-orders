import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Order } from '../db/entities/orders.entity';
import { OrdersService } from './orders.service';
import {CreateOrderDto} from "../db/create.order.dto";

@Resolver((of) => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query((returns) => Order)
  async order(@Args('id', { nullable: false, type: () => Int }) id: number) {
    return this.ordersService.getById(id);
  }

  @Mutation((returns) => Order)
  async createOrder(
    @Args('order', { nullable: false }) order: CreateOrderDto,
  ): Promise<Order> {
    return this.ordersService.create(order);
  }
}
