import { DiscountService } from './discount.service';
import { InmemoryDiscountsStorage } from './inmemory.discount.storage';

describe('discount service', () => {
  const sut = new DiscountService(new InmemoryDiscountsStorage());

  it('gets a discount greater than or equal to 0', async () => {
    expect(await sut.getDiscount()).toBeGreaterThanOrEqual(0);
  });

  it('gets a discount less than 100', async () => {
    expect(await sut.getDiscount()).toBeLessThan(100);
  });

  it('throws when there is no available discounts', async () => {
    const inmemoryDiscountsStorage = new InmemoryDiscountsStorage();
    await inmemoryDiscountsStorage.reset();
    const newDiscountService = new DiscountService(inmemoryDiscountsStorage);

    const oneHundredArray = new Array(100).fill(0);
    await Promise.all(
      oneHundredArray.map(
        newDiscountService.getDiscount.bind(newDiscountService),
      ),
    );

    await expect(
      newDiscountService.getDiscount.bind(newDiscountService),
    ).rejects.toThrowError('No Available Discount for Now!');
  });
});
