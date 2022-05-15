import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory } from '@loopback/repository';
import { MysqlDatasourceDataSource } from '../datasources';
import { Order, OrderRelations, ArUser, Restaurant, Currency, Deliverer} from '../models';
import { ArUserRepository } from './ar-user.repository';
import {RestaurantRepository} from './restaurant.repository';
import {CurrencyRepository} from './currency.repository';
import {DelivererRepository} from './deliverer.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {

  public readonly arUser: BelongsToAccessor<ArUser, typeof Order.prototype.id>;

  public readonly restaurant: BelongsToAccessor<Restaurant, typeof Order.prototype.id>;

  public readonly currency: HasOneRepositoryFactory<Currency, typeof Order.prototype.id>;

  public readonly deliverer: HasOneRepositoryFactory<Deliverer, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('ArUserRepository') protected arUserRepositoryGetter: Getter<ArUserRepository>, @repository.getter('RestaurantRepository') protected restaurantRepositoryGetter: Getter<RestaurantRepository>, @repository.getter('CurrencyRepository') protected currencyRepositoryGetter: Getter<CurrencyRepository>, @repository.getter('DelivererRepository') protected delivererRepositoryGetter: Getter<DelivererRepository>,
  ) {
    super(Order, dataSource);
    this.deliverer = this.createHasOneRepositoryFactoryFor('deliverer', delivererRepositoryGetter);
    this.registerInclusionResolver('deliverer', this.deliverer.inclusionResolver);
    this.currency = this.createHasOneRepositoryFactoryFor('currency', currencyRepositoryGetter);
    this.registerInclusionResolver('currency', this.currency.inclusionResolver);
    this.restaurant = this.createBelongsToAccessorFor('restaurant', restaurantRepositoryGetter,);
    this.registerInclusionResolver('restaurant', this.restaurant.inclusionResolver);
    this.arUser = this.createBelongsToAccessorFor('arUser', arUserRepositoryGetter,);
    this.registerInclusionResolver('arUser', this.arUser.inclusionResolver);
  }
}
