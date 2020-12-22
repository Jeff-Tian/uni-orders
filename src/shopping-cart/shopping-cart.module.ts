import { ShoppingCartController } from './shopping-cart.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
