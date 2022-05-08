import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {Restaurant, RestaurantRelations, RestaurantCategory} from '../models';
import {RestaurantCategoryRepository} from './restaurant-category.repository';

export class RestaurantRepository extends DefaultCrudRepository<
  Restaurant,
  typeof Restaurant.prototype.id,
  RestaurantRelations
> {

  public readonly restaurantCategory: HasOneRepositoryFactory<RestaurantCategory, typeof Restaurant.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('RestaurantCategoryRepository') protected restaurantCategoryRepositoryGetter: Getter<RestaurantCategoryRepository>,
  ) {
    super(Restaurant, dataSource);
    this.restaurantCategory = this.createHasOneRepositoryFactoryFor('restaurantCategory', restaurantCategoryRepositoryGetter);
    this.registerInclusionResolver('restaurantCategory', this.restaurantCategory.inclusionResolver);
  }
}
