import { IDiscountsStorage } from './IDiscountsStorage';
import { Inject, Injectable } from '@nestjs/common';
import { symbols } from '../constants';
import { Repository } from 'typeorm';
import { Discount } from '../db/entities/discounts.entity';
import { initialDiscounts } from './inmemory.discount.storage';

@Injectable()
export class DbDiscountsStorage implements IDiscountsStorage {
  constructor(
    @Inject(symbols.DISCOUNTS_REPOSITORY)
    private readonly discountRepo: Repository<Discount>,
  ) {}

  async getSize(): Promise<number> {
    const size = await this.discountRepo.count();

    if (size <= 0) {
      await this.reset();
    }

    return size;
  }

  async pop(): Promise<number | undefined> {
    const res = await this.discountRepo.findOne();

    if (res === undefined) {
      return undefined;
    }

    setTimeout(() => this.discountRepo.save(res), 1000);

    return res.value;
  }

  async reset(): Promise<void> {
    await Promise.all(
      initialDiscounts.map((value) => this.discountRepo.save({ value })),
    );
  }
}
