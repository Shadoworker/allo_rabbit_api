import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {Deliverer, DelivererRelations, ArUser, Order} from '../models';
import {ArUserRepository} from './ar-user.repository';
import {OrderRepository} from './order.repository';

export class DelivererRepository extends DefaultCrudRepository<
  Deliverer,
  typeof Deliverer.prototype.id,
  DelivererRelations
> {

  public readonly arUser: BelongsToAccessor<ArUser, typeof Deliverer.prototype.id>;

  public readonly orders: HasManyRepositoryFactory<Order, typeof Deliverer.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('ArUserRepository') protected arUserRepositoryGetter: Getter<ArUserRepository>, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Deliverer, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.arUser = this.createBelongsToAccessorFor('arUser', arUserRepositoryGetter,);
    this.registerInclusionResolver('arUser', this.arUser.inclusionResolver);
  }
}
