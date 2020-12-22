import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class CartItem {
  @ApiProperty()
  skuId: string;

  @ApiProperty()
  count: number;
}

class ModifiedCartItem {
  @ApiProperty()
  lineId: string;

  @ApiProperty()
  modifications: CartItemModifications;
}

class CartItemModifications {
  @ApiProperty()
  checked?: boolean;

  @ApiProperty()
  count?: number;

  @ApiProperty()
  skuId: string;
}

@Controller('shopping-cart')
export class ShoppingCartController {
  @Post()
  addToCart(@Body() items: CartItem[]) {
    return items;
  }

  @Put()
  modifyCart(@Body() modifiedItems: ModifiedCartItem[]) {
    return modifiedItems;
  }

  @Delete()
  deleteFromCart(@Body() deletedLineIds: string[]) {
    return deletedLineIds;
  }
}
