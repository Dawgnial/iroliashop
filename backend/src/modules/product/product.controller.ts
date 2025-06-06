import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductQueryParams } from './dto/getProducts.params.dto';
import { SetDefaultPipe } from './pipes/set-default.pipe';
import { Product } from './entities/product.entity';
import {
  CreatedResponse,
  SuccessRemoveMessageResponse,
  SuccessUpdateMessageResponse,
} from 'src/common/dto/success-message-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: CreatedResponse<Product> })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'title 1' },
        price: { type: 'number', example: 23000 },
        description: { type: 'string', example: 'random description' },
        categoryId: { type: 'number', example: 2 },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['name', 'price', 'description', 'categoryId'],
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body() data: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.ProductService.createProduct(data, file);
  }

  @Get()
  async getProducts(@Query(SetDefaultPipe) queryParams: ProductQueryParams) {
    return await this.ProductService.getProducts(queryParams);
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.ProductService.getProductById(id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: SuccessUpdateMessageResponse })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', example: 'title 1' },
        price: { type: 'number', example: 23000 },
        description: { type: 'string', example: 'random description' },
        categoryId: { type: 'number', example: 2 },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['name', 'price', 'description', 'categoryId'],
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Body() data: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.ProductService.updateProduct(id, data, image);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SuccessRemoveMessageResponse })
  async removeProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.ProductService.deleteProduct(id);
  }
}
