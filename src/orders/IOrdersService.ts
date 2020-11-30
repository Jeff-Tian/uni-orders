import { IOrder } from './IOrder';

export interface IOrdersService {
  findAll(): Promise<IOrder[]>;
}
