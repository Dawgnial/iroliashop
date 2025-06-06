import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { DeepPartial, Repository } from 'typeorm';
import { AddToBasketDto } from './dto/addToBasket.dto';
import { RemoveBasketDto } from './dto/removeFromBasket.dto';
import { SuccessRemoveMessageResponse } from 'src/common/dto/success-message-response.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly BasketRepository: Repository<Basket>,
    private readonly ProductService: ProductService,
  ) {}

  async addToBasket(data: AddToBasketDto, userId: number): Promise<Basket> {
    await this.ProductService.getProductById(data.productId);

    let basketItem: DeepPartial<Basket> = await this.BasketRepository.findOne({
      where: { userId, productId: data.productId },
    });

    basketItem
      ? (basketItem.count += 1)
      : (basketItem = this.BasketRepository.create({
          userId,
          productId: data.productId,
          count: 1,
        }));

    return await this.BasketRepository.save(basketItem);
  }

  async getBasket(userId: number) {
    const basketItems = await this.BasketRepository.find({
      where: { userId },
      relations: ['product'],
    });

    const items = basketItems.map((basketItem) => ({
      ...basketItem.product,
      count: basketItem.count,
      itemTotal: basketItem.product.price * basketItem.count,
    }));

    const total_amount = basketItems.reduce(
      (sum, basketItem) => sum + basketItem.product.price * basketItem.count,
      0,
    );

    return {
      items,
      total_amount,
    };
  }

  async removeFromBasket(
    data: RemoveBasketDto,
    userId: number,
  ): Promise<SuccessRemoveMessageResponse> {
    const basketItem = await this.BasketRepository.findOne({
      where: { userId, productId: data.productId },
    });

    if (basketItem) {
      if (basketItem.count <= 1) {
        await this.BasketRepository.delete({ id: basketItem.id });
        return {
          message: 'deleted successfully',
        };
      }

      basketItem.count -= 1;
      await this.BasketRepository.save(basketItem);

      return {
        message: 'deleted successfully',
      };
    }

    throw new NotFoundException('You did not add this product.');
  }

  async removeAllBasketItems(
    userId: number,
  ): Promise<SuccessRemoveMessageResponse> {
    const { affected } = await this.BasketRepository.delete({ userId });

    if (!affected) throw new BadRequestException('Basket is already empty !');

    return {
      message: 'deleted successfully',
    };
  }
}
