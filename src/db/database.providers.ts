import { createConnection } from 'typeorm';
import { symbols } from '../constants';

export const databaseProviders = [
  {
    provide: symbols.DATABASE_CONNECTION,
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'nopwd',
        database: 'orders',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
