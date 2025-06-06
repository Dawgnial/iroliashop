import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ProductQueryParams } from '../dto/getProducts.params.dto';

@Injectable()
export class SetDefaultPipe implements PipeTransform {
  transform(value: ProductQueryParams) {
    const { categoryId, page, take } = value;
    const result = {
      page,
      take,
      categoryId,
    };

    if (!page) result.page = 1;
    if (!take) result.take = 20;

    delete value.page;
    delete value.take;

    return result;
  }
}
