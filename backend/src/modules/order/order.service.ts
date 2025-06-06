import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, DeepPartial, QueryRunner, Repository } from 'typeorm';
import { BasketService } from '../Basket/basket.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemStatus, OrderStatus } from 'src/common/enum/order-status';
import { SuccessRemoveMessageResponse } from 'src/common/dto/success-message-response.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Pagination } from 'src/common/utility/pagination';
import { ChangeOrderStatusDto } from './dto/change-status.dto';
import { ChangeAddressDto } from './dto/change-address.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
    private readonly BasketService: BasketService,
    private readonly dataSource: DataSource,
    private readonly UserService: UserService,
  ) {}

  async createOrder(userId: number) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();

      const { items, total_amount } =
        await this.BasketService.getBasket(userId);
      const user: DeepPartial<User> =
        await this.UserService.getUserById(userId);

      if (!user.address)
        throw new BadRequestException('Please enter your address');

      const newOrder = queryRunner.manager.create(Order, {
        address: user.address,
        userId,
        payment_amount: total_amount,
      });

      const savedOrder = await queryRunner.manager.save(Order, newOrder);

      const orderItems: DeepPartial<OrderItem>[] = [];

      for (const element of items) {
        orderItems.push({
          count: element.count,
          orderId: savedOrder.id,
          productId: element.id,
          status: OrderItemStatus.Pending,
        });
      }

      if (orderItems.length === 0)
        throw new BadRequestException('Not found any item in your basket');

      await this.BasketService.removeAllBasketItems(userId);

      await queryRunner.manager.save(OrderItem, orderItems);
      await queryRunner.commitTransaction();

      return {
        message: 'Your order added successfully',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async removeOrder(userId: number): Promise<SuccessRemoveMessageResponse> {
    const { affected } = await this.OrderRepository.delete({ userId });

    if (!affected) throw new NotFoundException();

    return {
      message: 'deleted successfully',
    };
  }

  async getUserOrders(userId: number) {
    const orders: DeepPartial<Order>[] = await this.OrderRepository.find({
      where: { userId },
    });

    if (!orders) throw new NotFoundException('User-orders is empty');

    return { orders };
  }

  async getAllOrders(paginationDto: PaginationDto) {
    const { take, skip } = Pagination(paginationDto);

    const orders: DeepPartial<Order>[] = await this.OrderRepository.find({
      skip,
      take,
      order: { createdAt: 'DESC' },
    });

    if (!orders) throw new NotFoundException('Order-list is empty');

    return { orders, page: paginationDto.page };
  }

  async ChangeStatus(id: number, dto: ChangeOrderStatusDto) {
    const { affected } = await this.OrderRepository.update(id, { ...dto });

    if (!affected) throw new NotFoundException('Order not found');

    return {
      changedStatus: dto.status,
    };
  }

  async ChangeAddress(dto: ChangeAddressDto, userId: number, orderId: number) {
    const { affected } = await this.OrderRepository.update(
      { userId, id: orderId },
      { ...dto },
    );

    if (!affected)
      throw new NotFoundException('No order with this id for you !');

    return {
      newAddress: dto.address,
    };
  }
}
