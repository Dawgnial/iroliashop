import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ maximum: 100, minimum: 3 })
  @IsString()
  @Length(3, 100)
  title: string;
}
