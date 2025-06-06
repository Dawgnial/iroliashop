import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import {
  SuccessRemoveMessageResponse,
  SuccessUpdateMessageResponse,
} from 'src/common/dto/success-message-response.dto';
import { S3Service } from 'src/common/services/S3.service';
import { ProductQueryParams } from './dto/getProducts.params.dto';
import { Pagination } from 'src/common/utility/pagination';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
    private readonly S3Service: S3Service,
  ) {}

  async createProduct(data: CreateProductDto, image: Express.Multer.File) {
    const { categoryId, description, title, price } = data;

    const product: DeepPartial<Product> = await this.ProductRepository.findOne({
      where: { categoryId, title },
    });

    if (product) throw new ConflictException();

    if (image) {
      const { key, url } = await this.S3Service.uploadFile(image);

      const newProduct = this.ProductRepository.create({
        categoryId,
        description,
        imageUrl: key,
        price,
        title,
      });

      const savedProduct = await this.ProductRepository.save(newProduct);

      return {
        data: savedProduct,
        imageUrl: url,
      };
    } else {
      const newProduct = this.ProductRepository.create({
        categoryId,
        description,
        price,
        title,
      });

      return await this.ProductRepository.save(newProduct);
    }
  }

  async getProducts(
    params: ProductQueryParams,
  ): Promise<Array<DeepPartial<Product>>> {
    const { categoryId, page, take } = params;

    const pagination = Pagination({ take, page });

    if (!categoryId)
      return await this.ProductRepository.find({
        skip: pagination.skip,
        take: pagination.take,
        relations: ['category'],
      });

    return await this.ProductRepository.find({
      where: { categoryId },
      skip: pagination.skip,
      take: pagination.take,
      relations: ['category'],
    });
  }

  async getProductById(id: number) {
    const product: DeepPartial<Product> = await this.ProductRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async updateProduct(
    id: number,
    data: UpdateProductDto,
    image: Express.Multer.File,
  ): Promise<SuccessUpdateMessageResponse> {
    const product = await this.ProductRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    const { title, categoryId, description, price } = data;

    const conflict = await this.ProductRepository.findOne({
      where: { title, categoryId },
    });
    if (conflict && conflict.id !== id) throw new ConflictException();

    if (image) {
      if (product.imageUrl) {
        await this.S3Service.deleteFile(product.imageUrl);
        const { key } = await this.S3Service.uploadFile(image);

        await this.ProductRepository.update(id, {
          title,
          categoryId,
          description,
          price,
          imageUrl: key,
        });

        return {
          message: 'Updated successfully',
        };
      }
      const { key } = await this.S3Service.uploadFile(image);

      await this.ProductRepository.update(id, {
        title,
        categoryId,
        description,
        price,
        imageUrl: key,
      });

      return {
        message: 'Updated successfully',
      };
    } else {
      await this.ProductRepository.update(id, {
        title,
        categoryId,
        description,
        price,
      });

      return {
        message: 'Updated successfully',
      };
    }
  }

  async deleteProduct(id: number): Promise<SuccessRemoveMessageResponse> {
    const { affected } = await this.ProductRepository.delete({ id });

    if (!affected) throw new NotFoundException();

    return {
      message: 'deleted successfully',
    };
  }
}
