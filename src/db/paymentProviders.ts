import { symbols } from '../constants';
import { Connection } from 'typeorm';
import { Payment } from './entities/payments.entity';

export const paymentProviders = [
  {
    provide: symbols.PAYMENTS_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Payment),
    inject: [symbols.DATABASE_CONNECTION],
  },
];
