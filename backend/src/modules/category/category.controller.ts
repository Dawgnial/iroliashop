import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { SetPaginationDefaultPipe } from 'src/common/pipes/Pagination-default.pipe';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  CreatedResponse,
  SuccessRemoveMessageResponse,
  SuccessUpdateMessageResponse,
} from 'src/common/dto/success-message-response.dto';
import { Category } from './entities/category.entity';

@Controller('api/v1/category')
//! roles
// @Auth()
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: CreatedResponse<Category> })
  @Role(['user']) //!
  async createCategory(@Body() data: CreateCategoryDto) {
    return await this.CategoryService.createCategory(data);
  }

  @Get()
  @Pagination()
  @Public()
  async getCategories(
    @Query(SetPaginationDefaultPipe) paginationDto: PaginationDto,
  ) {
    return await this.CategoryService.getCategories(paginationDto);
  }

  @Get(':id')
  @Public()
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.CategoryService.getCategoryById(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: SuccessUpdateMessageResponse })
  @Public()
  async updateCategory(
    @Body() data: UpdateCategoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.CategoryService.updateCategory(id, data);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SuccessRemoveMessageResponse })
  async removeCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.CategoryService.removeCategoryById(id);
  }
}
