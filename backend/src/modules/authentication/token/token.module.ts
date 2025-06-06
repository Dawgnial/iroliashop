import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [JwtService],
  exports: [JwtService],
})
export class TokenModule {}
