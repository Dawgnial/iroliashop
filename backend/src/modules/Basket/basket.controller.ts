import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddToBasketDto } from './dto/addToBasket.dto';
import { getUser } from 'src/common/decorators/get-user.decorator';
import { IUser } from 'src/common/@types/user-type';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { RemoveBasketDto } from './dto/removeFromBasket.dto';
import { SuccessRemoveMessageResponse } from 'src/common/dto/success-message-response.dto';

@Controller('api/v1/basket')
@Auth()
export class BasketController {
  constructor(private readonly BasketService: BasketService) {}

  @Post()
  @Role(['user'])
  @HttpCode(HttpStatus.OK)
  async addToBasket(@Body() data: AddToBasketDto, @getUser() user: IUser) {
    return await this.BasketService.addToBasket(data, user.id);
  }

  @Get()
  @Role(['user'])
  async getBasket(@getUser() user: IUser) {
    return await this.BasketService.getBasket(user.id);
  }

  @Delete()
  @Role(['user'])
  @ApiOkResponse({ type: SuccessRemoveMessageResponse })
  async removeFromBasket(
    @Body() data: RemoveBasketDto,
    @getUser() user: IUser,
  ) {
    return await this.BasketService.removeFromBasket(data, user.id);
  }
}
