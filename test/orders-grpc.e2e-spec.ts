import GrpcClient from 'grpc-man/lib/Client';
import { join } from 'path';

describe('Health check', () => {
  it("checks app's grpc healthy", async () => {
    const client = new GrpcClient(
      '127.0.0.1:5005',
      join(__dirname, '../node_modules/grpc-health/src/health/health.orders'),
    );

    const res = await client.grpc.grpc.health.v1.Health.check({
      service: 'orders',
    });

    expect(res).toStrictEqual({ status: 'SERVING' });
  });
});
