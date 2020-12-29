import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('OrderController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.skip('patches an order', () => {
    return request(app.getHttpServer())
      .patch('/orders')
      .send({
        id: 4,
        number: '2020-12-29-41899524',
        cents: 100,
        randomDiscountCents: 22,
        status: '3',
        created_at: '2020-12-29T11:38:19.524Z',
        paid_at: null,
        cancelled_at: null,
        timeout_at: null,
        remark: '创世订单',
        index: 0,
      })
      .expect(200)
      .expect({
        id: 4,
        number: '2020-12-29-41899524',
        cents: 100,
        randomDiscountCents: 22,
        status: '3',
        created_at: '2020-12-29T11:38:19.524Z',
        paid_at: null,
        cancelled_at: null,
        timeout_at: null,
        remark: '创世订单',
        index: 0,
      });
  });
});
