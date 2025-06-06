import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from 'src/common/decorators/role.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';
import { getUser } from 'src/common/decorators/get-user.decorator';
import { IUser } from 'src/common/@types/user-type';
import { StripUserSecretsInterCeptor } from 'src/common/interceptors/user-security.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/user')
@Auth()
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('profile')
  @Role(['user'])
  @UseInterceptors(StripUserSecretsInterCeptor)
  async getProfile(@getUser() user: IUser) {
    return await this.UserService.getUserById(user.id);
  }

  @Delete('log-out')
  @Role(['user'])
  async LogOutFromAcount(@getUser() user: IUser) {
    return await this.UserService.removeUser(user.id);
  }

  @Put()
  @Role(['user'])
  async update(@Body() dto: UpdateUserDto, @getUser() user: IUser) {
    return await this.UserService.updateUser(user.id, dto);
  }
}
