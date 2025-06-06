import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/authentication/guard/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { ApiHeader } from '@nestjs/swagger';

export const Auth = () => {
  return applyDecorators(
    // ApiHeader({ name: 'authorization', required: true }),
    UseGuards(AuthGuard, RoleGuard),
  );
};
