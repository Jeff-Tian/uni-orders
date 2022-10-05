import {Inject, Injectable, Logger} from '@nestjs/common';
import {Order} from '../db/entities/orders.entity';
import {symbols} from '../constants';
import {Repository} from 'typeorm';
import {Payment} from '../db/entities/payments.entity';
import {OrderStatus} from '../db/entities/orderStatus';
import {HttpService} from '@nestjs/axios';

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);

    constructor(
        @Inject(symbols.PAYMENTS_REPOSITORY)
        private paymentRepo: Repository<Payment>,
        @Inject(symbols.ORDERS_REPOSITORY) private orderRepo: Repository<Order>,
        private readonly httpService: HttpService,
    ) {
    }

    public async findAndUpdatePaymentsFor(order: Order) {
        const payments = await this.findPaymentsFor(order);
        this.logger.log(`订单 ${order.id} 的支付记录查询结果是： ${payments}`)

        if (payments && payments.length > 0) {
            order.paid_at = new Date(payments[0].pay_time * 1000);
            order.status = OrderStatus.Paid;
            await this.orderRepo.save(order);

            payments.forEach((payment) => {
                payment.order_id = order.id;
                this.paymentRepo.save(payment);
            });
        } else if (payments.length === 0) {
            const now = new Date();

            if (now.getTime() - order.created_at.getTime() >= 10 * 60 * 1000) {
                order.status = OrderStatus.Timeout;
                order.timeout_at = now;
                await this.orderRepo.save(order);
            }
        }
    }

    private async findPaymentsFor(order: Order): Promise<Payment[]> {
        const totalFee = order.cents - order.randomDiscountCents;
        const url = `https://leg-godt.azurewebsites.net/api/wecom/Bill/hardmoney/${Math.floor(order.created_at.getTime() / 1000)}?cents=${totalFee}`;

        this.logger.log(`查询订单 ${order.id} 的 url 是 ${url}`);

        const res = await this.httpService
            .get(
                url,
            )
            .toPromise();

        return res.data;
    }
}
