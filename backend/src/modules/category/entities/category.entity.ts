import { Base } from 'src/common/entity/base-entity';
import { EntityNames } from 'src/common/enum/entityName';
import { Product } from 'src/modules/product/entities/product.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

@Entity(EntityNames.Category)
@Unique(['title'])
export class Category extends Base {
  @Column()
  title: string;

  @OneToMany(() => Product, (Product) => Product.category, {})
  product: Product[];
}
