import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { Tokenservice } from './token/token.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Role } from 'src/common/enum/role';
import { Hash } from 'src/common/utility/hash';
import { DeepPartial } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: Tokenservice,
  ) {}

  async login(data: RegisterDto) {
    let { email, name, password } = data;

    const user: DeepPartial<User> =
      await this.userService.getUserByEmail(email);

    if (user) {
      const AccessToken = await this.tokenService.createAccessToken({
        id: user.id,
        role: Role.USER,
      });

      return {
        accessToken: AccessToken,
      };
    }

    password = await Hash(password);
    const newUser = await this.userService.createUser({
      name: name || null,
      email,
      password,
    } as CreateUserDto);

    const AccessToken = await this.tokenService.createAccessToken({
      id: newUser.id,
      role: Role.USER,
    });

    return {
      accessToken: AccessToken,
    };
  }
}
