import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Connection } from 'typeorm';
import { symbols } from '../constants';
import { OrdersController } from './orders.controller';
import { mockRepo } from '../../test/mocks';
import { OrderStatus } from '../db/entities/orders.entity';
import { identity } from 'rxjs';
import { CreateOrderDto } from '../db/create.order.dto';

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
