import { OrdersService } from './orders.service';
import { mockRepo } from '../../test/mocks';

describe('order service', () => {
  const mockedNow = jest.fn();
  const orderService = new OrdersService(mockRepo as any);

  beforeEach(() => {
    Date.now = mockedNow.mockReturnValue(
      new Date('2020-12-01T20:20:54Z').getTime(),
    );
  });

  afterEach(() => {
    mockedNow.mockRestore();
  });

  test('generate order id', () => {
    const orderId = orderService.generateOrderNumber();
    expect(orderId).toBe('2020-12-01-54054000');
  });
});
