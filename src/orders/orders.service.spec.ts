import { OrdersService } from './orders.service';
import { mockRepo } from '../../test/mocks';
import {PaymentService} from "../payments/payment.service";
import {HttpService} from "@nestjs/axios";

describe('order service', () => {
  const mockedNow = jest.fn();
  const orderService = new OrdersService(mockRepo as any, new PaymentService(mockRepo as any, mockRepo as any, new HttpService()));

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
