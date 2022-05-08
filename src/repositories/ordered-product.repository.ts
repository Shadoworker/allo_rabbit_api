import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {OrderedProduct, OrderedProductRelations, Order, Product} from '../models';
import {OrderRepository} from './order.repository';
import {ProductRepository} from './product.repository';

export class OrderedProductRepository extends DefaultCrudRepository<
  OrderedProduct,
  typeof OrderedProduct.prototype.id,
  OrderedProductRelations
> {

  public readonly order: BelongsToAccessor<Order, typeof OrderedProduct.prototype.id>;

  public readonly product: BelongsToAccessor<Product, typeof OrderedProduct.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(OrderedProduct, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.order = this.createBelongsToAccessorFor('order', orderRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }
}
