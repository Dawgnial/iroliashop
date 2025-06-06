import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Pagination } from 'src/common/utility/pagination';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  SuccessRemoveMessageResponse,
  SuccessUpdateMessageResponse,
  SucessUpdateMessage,
  SucessDeletedMessage,
} from 'src/common/dto/success-message-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    data: CreateCategoryDto,
  ): Promise<DeepPartial<Category>> {
    const category = await this.CategoryRepository.findOneBy({
      title: data.title,
    });

    if (category) throw new ConflictException('Category already exists');

    const newCategory = this.CategoryRepository.create(data);

    const savedCategory = await this.CategoryRepository.save(newCategory);

    return (data = savedCategory);
  }

  async getCategories(
    paginationDto: PaginationDto,
  ): Promise<Array<DeepPartial<Category>>> {
    const pagination = Pagination(paginationDto);
    return await this.CategoryRepository.find({
      take: pagination.take,
      skip: pagination.skip,
    });
  }

  async getCategoryById(id: number): Promise<DeepPartial<Category>> {
    const category = await this.CategoryRepository.findOne({ where: { id } });

    if (!category) throw new NotFoundException('category not found');

    return category;
  }

  async updateCategory(
    id: number,
    data: UpdateCategoryDto,
  ): Promise<SuccessUpdateMessageResponse> {
    const conflict = await this.CategoryRepository.findOne({
      where: { title: data.title },
    });

    if (conflict && conflict?.id !== id)
      throw new ConflictException('There is category with this title before !');

    const { affected } = await this.CategoryRepository.update(id, { ...data });

    if (!affected) throw new NotFoundException('Category not found');

    return { message: SucessUpdateMessage };
  }

  async removeCategoryById(id: number): Promise<SuccessRemoveMessageResponse> {
    const { affected } = await this.CategoryRepository.delete({ id });

    if (!affected) throw new NotFoundException('Category not found');

    return {
      message: SucessDeletedMessage,
    };
  }
}
