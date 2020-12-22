import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiBody, ApiHeaders, ApiProperty, ApiTags } from '@nestjs/swagger';
import * as halson from 'halson';

class CartItem {
  @ApiProperty({
    type: String,
    description: 'The skuId for the cart item',
  })
  skuId: string;

  @ApiProperty({
    type: Number,
    description: 'The count of the item added to cart',
    minimum: 1,
  })
  count: number;
}

class CartItemModifications {
  @ApiProperty({
    type: Boolean,
    description: 'Whether the cart item is selected or not',
  })
  checked?: boolean;

  @ApiProperty({
    type: Number,
    description: 'The changed number of the cart item',
  })
  count?: number;

  @ApiProperty({
    type: String,
    description: 'The changed skuId of the cart item',
  })
  skuId: string;
}

class ModifiedCartItem {
  @ApiProperty({
    type: String,
    description: 'The lineId of the cart item',
  })
  lineId: string;

  @ApiProperty({
    type: CartItemModifications,
    description: 'The modifications to the cart item',
  })
  modifications: CartItemModifications;
}

@ApiTags('shopping-cart')
@ApiHeaders([
  {
    name: 'x-api-key',
    description: 'api key to call this endpoint',
  },
  {
    name: 'authorization',
    description: 'Bearer token to call this endpoint',
  },
])
@Controller('shopping-cart')
export class ShoppingCartController {
  @Post()
  @ApiBody({ type: [CartItem] })
  addToCart(@Body() items: CartItem[]) {
    return halson(items);
  }

  @Put()
  @ApiBody({ type: [ModifiedCartItem] })
  modifyCart(@Body() modifiedItems: ModifiedCartItem[]) {
    return halson(modifiedItems);
  }

  @Delete()
  @ApiBody({ type: [String] })
  deleteFromCart(@Body() deletedLineIds: string[]) {
    return halson(deletedLineIds);
  }
}
