import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {Restaurant, RestaurantRelations, RestaurantCategory, ArUser} from '../models';
import {RestaurantCategoryRepository} from './restaurant-category.repository';
import {ArUserRepository} from './ar-user.repository';

export class RestaurantRepository extends DefaultCrudRepository<
  Restaurant,
  typeof Restaurant.prototype.id,
  RestaurantRelations
> {

  public readonly restaurantCategory: HasOneRepositoryFactory<RestaurantCategory, typeof Restaurant.prototype.id>;

  public readonly arUser: BelongsToAccessor<ArUser, typeof Restaurant.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('RestaurantCategoryRepository') protected restaurantCategoryRepositoryGetter: Getter<RestaurantCategoryRepository>, @repository.getter('ArUserRepository') protected arUserRepositoryGetter: Getter<ArUserRepository>,
  ) {
    super(Restaurant, dataSource);
    this.arUser = this.createBelongsToAccessorFor('arUser', arUserRepositoryGetter,);
    this.registerInclusionResolver('arUser', this.arUser.inclusionResolver);
    this.restaurantCategory = this.createHasOneRepositoryFactoryFor('restaurantCategory', restaurantCategoryRepositoryGetter);
    this.registerInclusionResolver('restaurantCategory', this.restaurantCategory.inclusionResolver);
  }
}
