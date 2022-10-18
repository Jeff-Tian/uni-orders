import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Connection } from 'typeorm';
import { symbols } from '../constants';
import { OrdersController } from './orders.controller';
import { mockRepo } from '../../test/mocks';
import { identity } from 'rxjs';
import { CreateOrderDto } from '../db/create.order.dto';
import { OrderStatus } from '../db/entities/orderStatus';
import { PaymentService } from '../payments/payment.service';
import { HttpModule } from '@nestjs/axios';
import { DiscountService } from '../discounts/discount.service';
import { DbDiscountsStorage } from '../discounts/db.discount.storage';

describe('OrdersController', () => {
  let ordersController: OrdersController;

  const mockRepoProvider = {
    provide: symbols.ORDERS_REPOSITORY,
    useFactory: (_connection: Connection) => mockRepo,
  } as any;

  const mockPaymentRepoProvider = {
    provide: symbols.PAYMENTS_REPOSITORY,
    useFactory: (_connection: Connection) => mockRepo,
  };

  const mockDiscountDbRepoProvider = {
    provide: symbols.DISCOUNTS_REPOSITORY,
    useFactory: (_connection: Connection) => mockRepo,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      imports: [HttpModule],
      providers: [
        mockPaymentRepoProvider,
        mockRepoProvider,
        mockDiscountDbRepoProvider,
        PaymentService,
        OrdersService,
        DiscountService,
        { provide: symbols.IOrdersService, useClass: OrdersService },
        { provide: symbols.IDiscountStorage, useClass: DbDiscountsStorage },
      ],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('create/update', () => {
    const mockOrder = {
      cents: 1,
    };

    beforeAll(() => {
      mockRepo.create.mockImplementation(identity);
      mockRepo.save.mockImplementation(identity);
      mockRepo.findOneOrFail.mockImplementation(() => mockOrder);
    });

    it('creates order', async () => {
      const createdOrder = await ordersController.create(
        (mockOrder as unknown) as CreateOrderDto,
      );
      expect(createdOrder).toMatchObject(expect.objectContaining(mockOrder));
      expect(createdOrder.created_at).toBeDefined();
      expect(createdOrder.status).toBe(OrderStatus.Created);
    });

    it('patches an order', async () => {
      const updatedOrder = await ordersController.update({
        id: 1234,
        status: '3',
      } as any);

      expect(updatedOrder.status).toEqual(OrderStatus.Timeout);
    });
  });
});
