import { Inject, Injectable } from '@nestjs/common';
import { IDiscountsStorage } from './IDiscountsStorage';
import { symbols } from '../constants';

@Injectable()
export class DiscountService {
  constructor(
    @Inject(symbols.IDiscountStorage)
    private readonly discountsStorage: IDiscountsStorage,
  ) {}

  async getDiscount() {
    const discount = await this.discountsStorage.pop();

    if (discount === undefined) {
      throw new Error('No Available Discount for Now!');
    }

    return Promise.resolve(discount);
  }
}
