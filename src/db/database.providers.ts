import { ConnectionOptions, createConnection } from 'typeorm';
import { symbols } from '../constants';

const postgresqlConfig = {
  type: 'postgres',
  host: process.env.pgHost ?? 'localhost',
  port: process.env.pgPort ?? 5432,
  username: process.env.pgUsername ?? 'postgres',
  password: process.env.pgPassword ?? 'nopwd',
  database: 'orders',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
} as ConnectionOptions;

export const databaseProviders = [
  {
    provide: symbols.DATABASE_CONNECTION,
    useFactory: async () => await createConnection(postgresqlConfig),
  },
];
