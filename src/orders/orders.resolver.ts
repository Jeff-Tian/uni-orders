import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Order } from '../db/entities/orders.entity';
import { OrdersService } from './orders.service';

@Resolver((of) => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query((returns) => Order)
  async order(@Args('id', { nullable: false, type: () => Int }) id: number) {
    return this.ordersService.getById(id);
  }
}
