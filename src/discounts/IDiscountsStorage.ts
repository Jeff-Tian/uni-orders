export interface IDiscountsStorage {
    reset(): Promise<void>;

    pop(): Promise<number>;

    getSize(): Promise<number>;
}
