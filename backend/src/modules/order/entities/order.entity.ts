import { Base } from 'src/common/entity/base-entity';
import { OrderStatus } from 'src/common/enum/order-status';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';

@Entity('order')
export class Order extends Base {
  @Column()
  userId: number;

  @Column({ type: 'double' })
  payment_amount: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @Column({ type: 'varchar', default: 'Buy goods from shop' })
  description: string;

  @Column()
  address: string;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
