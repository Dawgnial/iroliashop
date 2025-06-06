import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/role.decorator';
import { PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly Reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    if (this.isPublic(context)) return true;

    const userRole = context.switchToHttp().getRequest().user.role;
    const requiredRoles: string[] = this.Reflector.get(
      ROLE_KEY,
      context.getHandler(),
    );

    const res = requiredRoles.includes(userRole);

    if (!res) throw new ForbiddenException('Access denied !');

    return true;
  }

  private isPublic(ctx: ExecutionContext) {
    const isPublic = this.Reflector.get(PUBLIC_KEY, ctx.getHandler());

    return isPublic ? true : false;
  }
}
