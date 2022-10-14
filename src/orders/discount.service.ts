import {Injectable} from "@nestjs/common";

@Injectable()
export class DiscountService {
    async getDiscount() {
        return 1
    }
}