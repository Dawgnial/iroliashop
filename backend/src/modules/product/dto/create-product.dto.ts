import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Product 1' })
  @IsString()
  @Length(2, 100)
  title: string;

  @ApiProperty({ example: 'description 1' })
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  image: Express.Multer.File;

  @ApiProperty()
  @IsNumberString()
  price: number;

  @ApiProperty({ example: 2 })
  @IsNumberString()
  categoryId: number;
}
