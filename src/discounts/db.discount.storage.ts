import { IDiscountsStorage } from './IDiscountsStorage';
import { Inject, Injectable } from '@nestjs/common';
import { symbols } from '../constants';
import { Repository } from 'typeorm';
import { Discount } from '../db/entities/discounts.entity';

@Injectable()
export class DbDiscountsStorage implements IDiscountsStorage {
  constructor(
    @Inject(symbols.DISCOUNTS_REPOSITORY)
    private readonly discountRepo: Repository<Discount>,
  ) {}

  async getSize(): Promise<number> {
    return await this.discountRepo.count();
  }

  async pop(): Promise<number | undefined> {
    const res = await this.discountRepo.findOne();

    if (res === undefined) {
      return undefined;
    }

    setTimeout(() => this.discountRepo.save(res), 1000);

    return res.value;
  }

  reset(): Promise<void> {
    return Promise.resolve();
  }
}
