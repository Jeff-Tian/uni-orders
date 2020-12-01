import { Connection } from 'typeorm';
import { Order } from './entities/orders.entity';
import { symbols } from '../constants';

export const orderProviders = [
  {
    provide: symbols.ORDERS_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Order),
    inject: [symbols.DATABASE_CONNECTION],
  },
];
