import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { symbols } from '../constants';
import { DatabaseModule } from '../db/database.module';
import { orderProviders } from '../db/orderProviders';
import { PaymentService } from '../payments/payment.service';
import { paymentProviders } from '../db/paymentProviders';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [OrdersController],
  providers: [
    ...orderProviders,
    ...paymentProviders,
    OrdersService,
    PaymentService,
    { provide: symbols.IOrdersService, useClass: OrdersService },
  ],
})
export class OrdersModule {}
