import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty()
  @IsString()
  address: string;
}
