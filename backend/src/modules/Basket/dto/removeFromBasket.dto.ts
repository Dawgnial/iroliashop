import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RemoveBasketDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  productId: number;
}
