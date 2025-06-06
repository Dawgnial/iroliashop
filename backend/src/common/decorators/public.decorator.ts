import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'is_public';

export const Public = () => {
  return SetMetadata(PUBLIC_KEY, true);
};
