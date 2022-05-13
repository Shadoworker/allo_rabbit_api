import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {Restaurant, RestaurantRelations, RestaurantCategory, ArUser, Product} from '../models';
import {RestaurantCategoryRepository} from './restaurant-category.repository';
import {ArUserRepository} from './ar-user.repository';
import {ProductRepository} from './product.repository';

export class RestaurantRepository extends DefaultCrudRepository<
  Restaurant,
  typeof Restaurant.prototype.id,
  RestaurantRelations
> {

  public readonly restaurantCategory: HasOneRepositoryFactory<RestaurantCategory, typeof Restaurant.prototype.id>;

  public readonly arUser: BelongsToAccessor<ArUser, typeof Restaurant.prototype.id>;

  public readonly products: HasManyRepositoryFactory<Product, typeof Restaurant.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('RestaurantCategoryRepository') protected restaurantCategoryRepositoryGetter: Getter<RestaurantCategoryRepository>, @repository.getter('ArUserRepository') protected arUserRepositoryGetter: Getter<ArUserRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Restaurant, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.arUser = this.createBelongsToAccessorFor('arUser', arUserRepositoryGetter,);
    this.registerInclusionResolver('arUser', this.arUser.inclusionResolver);
    this.restaurantCategory = this.createHasOneRepositoryFactoryFor('restaurantCategory', restaurantCategoryRepositoryGetter);
    this.registerInclusionResolver('restaurantCategory', this.restaurantCategory.inclusionResolver);
  }
}
