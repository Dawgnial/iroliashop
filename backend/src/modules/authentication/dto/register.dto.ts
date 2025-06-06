import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ maximum: 50, minimum: 3 })
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ maximum: 100, minimum: 8 })
  @IsString()
  @Length(8, 100)
  password: string;
}
