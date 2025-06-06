import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { ProductService } from '../product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Product } from '../product/entities/product.entity';
import { S3Service } from 'src/common/services/S3.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Tokenservice } from '../authentication/token/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Basket, User, Product])],
  controllers: [BasketController],
  providers: [
    BasketService,
    UserService,
    JwtService,
    Tokenservice,
    ProductService,
    S3Service,
  ],
  exports: [],
})
export class BasketModule {}
