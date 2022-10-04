import {HttpException, Inject, Injectable, Logger} from '@nestjs/common';
import {IOrdersService} from './IOrdersService';
import {symbols} from '../constants';
import {Repository} from 'typeorm';
import {Order} from '../db/entities/orders.entity';
import assert = require('assert');
import * as util from 'util';
import {CreateOrderDto} from 'src/db/create.order.dto';
import {OrderStatus} from '../db/entities/orderStatus';
import {PaymentService} from '../payments/payment.service';

@Injectable()
export class OrdersService implements IOrdersService {
    private readonly logger = new Logger(OrdersService.name);

    constructor(
        @Inject(symbols.ORDERS_REPOSITORY) private orderRepo: Repository<Order>,
        private readonly paymentService: PaymentService,
    ) {
    }

    private async saveOrFail(order: Order) {
        try {
            return await this.orderRepo.save(order);
        } catch (ex) {
            const errorContext = {order, ex};
            this.logger.error(ex.message, ex.stack, util.inspect(errorContext));

            throw new HttpException(errorContext, 400);
        }
    }

    async update(orderId: number, newStatus: OrderStatus): Promise<Order> {
        const order = await this.orderRepo.findOneOrFail(orderId);
        order.status = newStatus;

        return await this.saveOrFail(order);
    }

    generateOrderNumber() {
        const now = Date.now();
        const time = new Date(now);

        return `${time.toISOString().substr(0, 10)}-${now.toString().substr(5)}`;
    }

    async findAll(): Promise<Order[]> {
        return this.orderRepo.find();
    }

    async getById(orderId: number): Promise<Order> {
        const order = await this.orderRepo.findOneOrFail(orderId);

        if (order.paymentMethod === 'wecom-pay') {
            this.logger.log(`查询支付记录 ${JSON.stringify(order)}`)
            await this.paymentService.findAndUpdatePaymentsFor(order);
        }

        return order;
    }

    async create(order: CreateOrderDto): Promise<Order> {
        try {
            assert.ok(order.cents);
        } catch (ex) {
            this.logger.error(ex.message, ex.stack, util.inspect(order));
            throw new HttpException({order, ex}, 400);
        }

        const entity = this.orderRepo.create(({
            ...order,
            randomDiscountCents: this.getRandomDiscountCents(order.cents),
            number: this.generateOrderNumber(),
            status: OrderStatus.Created,
            created_at: new Date(),
        } as unknown) as Order);

        return await this.saveOrFail(entity);
    }

    private getRandomDiscountCents(cents: number) {
        return 1 + Math.floor(Math.random() * cents);
    }
}
