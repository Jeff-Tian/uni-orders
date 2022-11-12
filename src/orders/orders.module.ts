import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { symbols } from '../constants';
import { DatabaseModule } from '../db/database.module';
import { orderProviders } from '../db/orderProviders';
import { PaymentService } from '../payments/payment.service';
import { paymentProviders } from '../db/paymentProviders';
import { HttpModule } from '@nestjs/axios';
import { DiscountService } from '../discounts/discount.service';
import { discountProviders } from '../db/discount.providers';
import { DbDiscountsStorage } from '../discounts/db.discount.storage';
import { OrdersResolver } from './orders.resolver';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [OrdersController],
  providers: [
    ...orderProviders,
    ...paymentProviders,
    ...discountProviders,
    DiscountService,
    OrdersService,
    PaymentService,
    { provide: symbols.IOrdersService, useClass: OrdersService },
    { provide: symbols.IDiscountStorage, useClass: DbDiscountsStorage },
      OrdersResolver,
  ],
})
export class OrdersModule {}
