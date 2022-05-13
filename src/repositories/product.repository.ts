import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import { MysqlDatasourceDataSource } from '../datasources';
import { Product, ProductRelations, ProductCategory } from '../models';
import { ProductCategoryRepository } from './product-category.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly productCategory: BelongsToAccessor<ProductCategory, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('ProductCategoryRepository') protected productCategoryRepositoryGetter: Getter<ProductCategoryRepository>,
  ) {
    super(Product, dataSource);
    this.productCategory = this.createBelongsToAccessorFor('productCategory', productCategoryRepositoryGetter,);
    this.registerInclusionResolver('productCategory', this.productCategory.inclusionResolver);
  }
}
