import {InmemoryDiscountsStorage} from "./inmemory.discount.storage";

describe('discount storage', () => {
    const sut = new InmemoryDiscountsStorage();

    it('pops up a number that is always greater than or equal to 0', async () => {
        expect(await sut.pop()).toBeGreaterThanOrEqual(0)
    })

    it('pops up a number that is always less than 100', async () => {
        expect(await sut.pop()).toBeLessThan(100)
    })

    it('resets', async () => {
        await sut.reset()
        expect(await sut.getSize()).toBe(100)
    })
})