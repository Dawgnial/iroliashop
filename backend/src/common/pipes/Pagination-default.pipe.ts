import { Injectable, PipeTransform } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class SetPaginationDefaultPipe implements PipeTransform {
  transform(value: PaginationDto) {
    const result = {
      take: parseInt(value.take?.toString()),
      page: parseInt(value.page?.toString()),
    };

    if (!result.page) result.page = 1;
    if (!result.take) result.take = 20;

    delete value.page;
    delete value.take;

    return result;
  }
}
