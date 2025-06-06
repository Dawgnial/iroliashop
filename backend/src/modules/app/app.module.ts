import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/common/configs/typeorm.confg';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../authentication/auth.module';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';
import { BasketModule } from '../Basket/basket.module';
import { OrderModule } from '../order/order.module';
import { User } from '../user/entities/user.entity';
import { InitializeAdmin } from 'src/common/services/initialize-admin.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    BasketModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, InitializeAdmin],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly InitializeService: InitializeAdmin) {}
  async onApplicationBootstrap() {
    await this.InitializeService.create();
  }
}
