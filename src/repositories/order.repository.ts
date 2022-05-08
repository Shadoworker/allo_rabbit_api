import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory } from '@loopback/repository';
import { MysqlDatasourceDataSource } from '../datasources';
import { Order, OrderRelations, ArUser, Restaurant, Currency} from '../models';
import { ArUserRepository } from './ar-user.repository';
import {RestaurantRepository} from './restaurant.repository';
import {CurrencyRepository} from './currency.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {

  public readonly arUser: BelongsToAccessor<ArUser, typeof Order.prototype.id>;

  public readonly restaurant: BelongsToAccessor<Restaurant, typeof Order.prototype.id>;

  public readonly currency: HasOneRepositoryFactory<Currency, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('ArUserRepository') protected arUserRepositoryGetter: Getter<ArUserRepository>, @repository.getter('RestaurantRepository') protected restaurantRepositoryGetter: Getter<RestaurantRepository>, @repository.getter('CurrencyRepository') protected currencyRepositoryGetter: Getter<CurrencyRepository>,
  ) {
    super(Order, dataSource);
    this.currency = this.createHasOneRepositoryFactoryFor('currency', currencyRepositoryGetter);
    this.registerInclusionResolver('currency', this.currency.inclusionResolver);
    this.restaurant = this.createBelongsToAccessorFor('restaurant', restaurantRepositoryGetter,);
    this.registerInclusionResolver('restaurant', this.restaurant.inclusionResolver);
    this.arUser = this.createBelongsToAccessorFor('arUser', arUserRepositoryGetter,);
    this.registerInclusionResolver('arUser', this.arUser.inclusionResolver);
  }
}
