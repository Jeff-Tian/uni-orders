import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { symbols } from '../constants';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    { provide: symbols.IOrdersService, useClass: OrdersService },
  ],
})
export class OrdersModule {}
