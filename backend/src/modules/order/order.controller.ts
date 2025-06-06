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
} from '@nestjs/common';
import { OrderService } from './order.service';
import { getUser } from 'src/common/decorators/get-user.decorator';
import { IUser } from 'src/common/@types/user-type';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { SuccessRemoveMessageResponse } from 'src/common/dto/success-message-response.dto';
import { SetDefaultPipe } from '../product/pipes/set-default.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ChangeOrderStatusDto } from './dto/change-status.dto';
import { ChangeAddressDto } from './dto/change-address.dto';

@Controller('api/v1/order')
@Auth()
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  @Post()
  @Role(['user'])
  async addOrder(@getUser() user: IUser) {
    await this.OrderService.createOrder(user.id);
  }

  @Delete()
  @Role(['user'])
  @ApiOkResponse({ type: SuccessRemoveMessageResponse })
  async removeOrder(@getUser() user: IUser) {
    return await this.OrderService.removeOrder(user.id);
  }

  @Get()
  @Role(['admin'])
  async getOrders(@Query(SetDefaultPipe) paginationDto: PaginationDto) {
    return await this.OrderService.getAllOrders(paginationDto);
  }

  @Get('user')
  @Role(['user'])
  async getUserOrders(@getUser() user: IUser) {
    return await this.OrderService.getUserOrders(user.id);
  }

  @Put(':id/status')
  @Role(['admin', 'user'])
  @ApiBody({ type: ChangeOrderStatusDto })
  async changeOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeOrderStatusDto,
  ) {
    return await this.OrderService.ChangeStatus(id, dto);
  }

  @Put('address/:id')
  @Role(['user'])
  async ChangeOrderAddress(
    @Body() dto: ChangeAddressDto,
    @getUser() user: IUser,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    return await this.OrderService.ChangeAddress(dto, user.id, orderId);
  }
}
