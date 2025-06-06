import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { BasketService } from '../Basket/basket.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Basket } from '../Basket/entities/basket.entity';
import { ProductService } from '../product/product.service';
import { Product } from '../product/entities/product.entity';
import { S3Service } from 'src/common/services/S3.service';
import { AuthModule } from '../authentication/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Basket, Product]),
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    BasketService,
    UserService,
    ProductService,
    S3Service,
  ],
  exports: [],
})
export class OrderModule {}
