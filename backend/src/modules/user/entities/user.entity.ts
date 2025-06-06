import { Base } from 'src/common/entity/base-entity';
import { EntityNames } from 'src/common/enum/entityName';
import { Role } from 'src/common/enum/role';
import { Basket } from 'src/modules/Basket/entities/basket.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

@Entity(EntityNames.User)
@Unique(['email', 'phone'])
export class User extends Base {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Basket, (basket) => basket.user)
  baskets: Basket[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
