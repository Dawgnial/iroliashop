import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ENV } from '../constant/env';
import { Role } from '../enum/role';
import { Hash } from '../utility/hash';

@Injectable()
export class InitializeAdmin {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private readonly Logger = new Logger(InitializeAdmin.name);

  async create(): Promise<void> {
    let {
      Super_Admin_Email,
      Super_Admin_Password,
      Super_Admin_Name,
      Super_Admin_Phone,
    } = ENV;

    const admin = await this.userRepository.findOneBy({
      email: Super_Admin_Email,
      role: Role.ADMIN,
    });

    if (admin) {
      this.Logger.log('admin initialized !');
      return;
    }

    try {
      Super_Admin_Password = await Hash(Super_Admin_Password);

      const admin = this.userRepository.create({
        email: Super_Admin_Email,
        password: Super_Admin_Password,
        name: Super_Admin_Name,
        role: Role.ADMIN,
        phone: Super_Admin_Phone,
      });

      await this.userRepository.save(admin);

      this.Logger.log('admin initialized !');

      return;
    } catch (error) {
      this.Logger.error(error.message);
    }
  }
}
