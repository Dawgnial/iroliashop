import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class ProductQueryParams {
  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  categoryId: number;

  @ApiProperty({ required: false, default: 1 })
  @IsNumberString()
  @IsOptional()
  page: number;

  @ApiProperty({ required: false, default: 20 })
  @IsNumberString()
  @IsOptional()
  take: number;
}
