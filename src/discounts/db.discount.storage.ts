import { IDiscountsStorage } from './IDiscountsStorage';
import { Inject, Injectable } from '@nestjs/common';
import { symbols } from '../constants';
import { QueryFailedError, Repository } from 'typeorm';
import { Discount } from '../db/entities/discounts.entity';
import { initialDiscounts } from './inmemory.discount.storage';

const ignoreDuplicationError = (err) => {
  if (
    !(
      err instanceof QueryFailedError &&
      err.message.startsWith(
        'duplicate key value violates unique constraint',
      ) &&
      err['code'] === '23505' &&
      err['detail'].match(/Key \(value\)=\(\d+\) already exists./)
    )
  ) {
    console.error(err, err.code, err.detail);
  }
};

@Injectable()
export class DbDiscountsStorage implements IDiscountsStorage {
  constructor(
    @Inject(symbols.DISCOUNTS_REPOSITORY)
    private readonly discountRepo: Repository<Discount>,
  ) {
    this.reset().then(console.log).catch(console.error);
  }

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
      initialDiscounts.map((value) => {
        console.log('this.discountRepo.save = ', this.discountRepo.save.toString());
        const promise = this.discountRepo.save({ value });
        console.log('file = ', __filename, 'promise = ', promise);
        return promise.catch(ignoreDuplicationError);
      }),
    );
  }
}
