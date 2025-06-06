import { Base } from 'src/common/entity/base-entity';
import { Basket } from 'src/modules/Basket/entities/basket.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { OrderItem } from 'src/modules/order/entities/order-item.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Product extends Base {
  @Column({ nullable: false, type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'double' })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;

  @Column('int')
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @OneToMany(() => Basket, (basket) => basket.product)
  baskets: Basket[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
