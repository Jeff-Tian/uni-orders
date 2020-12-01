import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../db/createOrderDto';
import { Connection } from 'typeorm';
import { symbols } from '../constants';
import { OrdersController } from './orders.controller';
import { mockRepo } from '../../test/mocks';
import { OrderStatus } from '../db/entities/orders.entity';
import { identity } from 'rxjs';

describe('OrdersController', () => {
  let ordersController: OrdersController;

  const mockRepoProvider = {
    provide: symbols.ORDERS_REPOSITORY,
    useFactory: (_connection: Connection) => mockRepo,
  } as any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        mockRepoProvider,
        OrdersService,
        { provide: symbols.IOrdersService, useClass: OrdersService },
      ],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('create', () => {
    it('creates order', async () => {
      const mockOrder = {
        cents: 1,
      };
      mockRepo.create.mockImplementation(identity);
      mockRepo.save.mockImplementation(identity);

      const createdOrder = await ordersController.create(
        (mockOrder as unknown) as CreateOrderDto,
      );
      expect(createdOrder).toMatchObject(expect.objectContaining(mockOrder));
      expect(createdOrder.created_at).toBeDefined();
      expect(createdOrder.status).toBe(OrderStatus.Created);
    });
  });
});
