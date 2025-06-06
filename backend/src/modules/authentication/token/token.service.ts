import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ENV } from 'src/common/constant/env';
import { Role } from 'src/common/enum/role';

export interface TokenPaylod {
  id: number;
  role: Role;
}
@Injectable()
export class Tokenservice {
  constructor(private readonly JwtService: JwtService) {}

  async createAccessToken(payload: TokenPaylod): Promise<string> {
    return this.JwtService.signAsync(payload, {
      secret: ENV.JwtSecret,
      expiresIn: ENV.JwtExpire,
    });
  }

  async validateToken(token: string): Promise<TokenPaylod> {
    try {
      const paylod = await this.JwtService.verify(token, {
        secret: ENV.JwtSecret,
      });
      return paylod;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
