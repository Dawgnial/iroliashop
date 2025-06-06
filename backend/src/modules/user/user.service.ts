import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SuccessRemoveMessageResponse } from 'src/common/dto/success-message-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async createUser(user: CreateUserDto): Promise<DeepPartial<User>> {
    const IsUserExist = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (IsUserExist)
      throw new ConflictException('User with this email already exists');

    const newUser: DeepPartial<User> = this.userRepository.create({
      name: user?.name || null,
      email: user.email,
      password: user.password,
    });

    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const { affected } = await this.userRepository.update(id, { ...dto });

    if (!affected) throw new NotFoundException('User not found');

    return {
      changedFields: { ...dto },
    };
  }

  async removeUser(id: number): Promise<SuccessRemoveMessageResponse> {
    const { affected } = await this.userRepository.delete({ id });

    if (!affected) throw new NotFoundException('user not found');

    return {
      message: 'deleted successfully',
    };
  }
}
