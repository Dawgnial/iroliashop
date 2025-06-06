import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ChangeAddressDto {
  @ApiProperty()
  @IsString()
  address: string;
}
