import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { symbols } from '../constants';
import { DatabaseModule } from '../db/database.module';
import { orderProviders } from '../db/orderProviders';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [
    ...orderProviders,
    OrdersService,
    { provide: symbols.IOrdersService, useClass: OrdersService },
  ],
})
export class OrdersModule {}
