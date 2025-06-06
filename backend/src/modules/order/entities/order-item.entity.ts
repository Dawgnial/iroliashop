import { Base } from 'src/common/entity/base-entity';
import { OrderItemStatus } from 'src/common/enum/order-status';
import { Product } from 'src/modules/product/entities/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity('order-items')
export class OrderItem extends Base {
  @Column('int')
  productId: number;

  @Column('int')
  orderId: number;

  @Column('int')
  count: number;

  @Column({
    type: 'enum',
    enum: OrderItemStatus,
    default: OrderItemStatus.Pending,
  })
  status: OrderItemStatus;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: Order;
}
