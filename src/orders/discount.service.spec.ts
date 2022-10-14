import {DiscountService} from "./discount.service";

describe('discount service', () => {
    const sut = new DiscountService();

    it('gets a discount greater than or equal to 0', async () => {
        expect(await sut.getDiscount()).toBeGreaterThanOrEqual(0)
    })

    it('gets a discount less than 100', async () => {
        expect(await sut.getDiscount()).toBeLessThan(100);
    })
})