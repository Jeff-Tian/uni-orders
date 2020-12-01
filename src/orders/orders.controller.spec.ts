import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../db/createOrderDto';
import { Connection } from 'typeorm';
import { symbols } from '../constants';
import { OrdersController } from './orders.controller';

describe('OrdersController', () => {
  let ordersController: OrdersController;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
  };
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
      mockRepo.create.mockReturnValue(mockOrder);
      mockRepo.save.mockReturnValue(mockOrder);

      expect(
        await ordersController.create((mockOrder as unknown) as CreateOrderDto),
      ).toBe(mockOrder);
    });
  });
});
