import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor } from '@loopback/repository';
import { MysqlDatasourceDataSource } from '../datasources';
import { Product, ProductRelations, ProductCategory, Restaurant } from '../models';
import { ProductCategoryRepository } from './product-category.repository';
import { RestaurantRepository } from './restaurant.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly productCategory: BelongsToAccessor<ProductCategory, typeof Product.prototype.id>;

  public readonly restaurant: BelongsToAccessor<Restaurant, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('ProductCategoryRepository') protected productCategoryRepositoryGetter: Getter<ProductCategoryRepository>, @repository.getter('RestaurantRepository') protected restaurantRepositoryGetter: Getter<RestaurantRepository>,
  ) {
    super(Product, dataSource);
    this.restaurant = this.createBelongsToAccessorFor('restaurant', restaurantRepositoryGetter,);
    // this.registerInclusionResolver('restaurant', this.restaurant.inclusionResolver);
    this.productCategory = this.createBelongsToAccessorFor('productCategory', productCategoryRepositoryGetter,);
    // this.registerInclusionResolver('productCategory', this.productCategory.inclusionResolver);
  }
}
