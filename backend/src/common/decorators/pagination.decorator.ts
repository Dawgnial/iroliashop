import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const Pagination = () => {
  return applyDecorators(
    ApiQuery({ name: 'page', default: 1, required: false }),
    ApiQuery({ name: 'take', default: 20, required: false }),
  );
};
