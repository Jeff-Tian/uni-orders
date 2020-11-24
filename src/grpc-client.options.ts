import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5005',
    package: 'uni',
    protoPath: join(__dirname, './orders/orders.proto'),
  },
};
