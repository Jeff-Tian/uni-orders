import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('OrderController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let order;

  it('creates an order', () => {
    return request(app.getHttpServer())
      .post('/orders')
      .send({ cents: 11, remark: 'test' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject({});
        order = res.body;
      });
  });

  it('patches an order', () => {
    return request(app.getHttpServer())
      .patch('/orders')
      .send({
        id: order.id,
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
        id: order.id,
        number: order.number,
        cents: order.cents,
        randomDiscountCents: order.randomDiscountCents,
        status: 3,
        created_at: order.created_at,
        paid_at: null,
        cancelled_at: null,
        timeout_at: null,
        remark: order.remark,
        paymentMethod: null,
        type: null,
      });
  });
});
