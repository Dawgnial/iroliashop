import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'title 1' })
  @IsString()
  @Length(2, 100)
  title: string;

  @ApiProperty({ example: 'description 1' })
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumberString()
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty()
  @IsNumberString()
  categoryId: number;
}
