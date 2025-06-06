import { Base } from 'src/common/entity/base-entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('basket')
export class Basket extends Base {
  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  count: number;

  @ManyToOne(() => Product, (product) => product.baskets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => User, (user) => user.baskets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
