import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/modules/user/user.service';
import { TokenPaylod, Tokenservice } from '../token/token.service';
import { Role } from 'src/common/enum/role';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly UserService: UserService,
    private readonly TokenService: Tokenservice,
    private readonly Reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublic(context)) return true;

    try {
      const request = context.switchToHttp().getRequest();
      const paylod: TokenPaylod = await this.validateToken(
        this.extractToken(request),
      );

      const user = await this.UserService.getUserById(paylod.id);

      if (!user) throw new UnauthorizedException();

      user.role === 'admin'
        ? (request.user = {
            id: user.id,
            role: Role.ADMIN,
          })
        : (request.user = {
            id: user.id,
            role: Role.USER,
          });

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private extractToken(request: Request): string {
    const token = request.headers.authorization;
    if (!token || !token.startsWith('Bearer')) {
      throw new UnauthorizedException('invalid token');
    }

    return token.split(' ')[1];
  }

  private async validateToken(token: string): Promise<TokenPaylod> {
    return await this.TokenService.validateToken(token);
  }

  private isPublic(ctx: ExecutionContext) {
    const isPublic = this.Reflector.get(PUBLIC_KEY, ctx.getHandler());

    return isPublic ? true : false;
  }
}
