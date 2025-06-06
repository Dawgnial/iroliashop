import { SetMetadata } from '@nestjs/common';
import { Role as roles } from '../enum/role';

export const ROLE_KEY = 'role';
export const Role = (roles: ('user' | 'admin')[]) => {
  return SetMetadata(ROLE_KEY, roles);
};
