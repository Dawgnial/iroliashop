import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponse } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'For login or register' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    type: AuthResponse,
  })
  async register(@Body() data: RegisterDto) {
    return await this.AuthService.login(data);
  }
}
