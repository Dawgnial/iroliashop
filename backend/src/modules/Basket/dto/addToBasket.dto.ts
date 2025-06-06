import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddToBasketDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  productId: number;
}
