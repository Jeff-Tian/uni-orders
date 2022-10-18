import { Connection } from 'typeorm';
import { symbols } from '../constants';
import { Discount } from './entities/discounts.entity';

export const discountProviders = [
  {
    provide: symbols.DISCOUNTS_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Discount),
    inject: [symbols.DATABASE_CONNECTION],
  },
];
