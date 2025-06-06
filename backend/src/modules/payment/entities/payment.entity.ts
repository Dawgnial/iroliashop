import { Base } from 'src/common/entity/base-entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('payment')
export class Payment extends Base {
  @Column({ default: false })
  status: boolean;

  @Column({ type: 'double' })
  amount: number;

  @Column()
  userId: number;

  @Column() //! relation
  orderId: number;

  @ManyToOne(() => User, (user) => user.payments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Order, (order) => order.payments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: Order;
}
