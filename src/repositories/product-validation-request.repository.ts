import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {ProductValidationRequest, ProductValidationRequestRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class ProductValidationRequestRepository extends DefaultCrudRepository<
  ProductValidationRequest,
  typeof ProductValidationRequest.prototype.id,
  ProductValidationRequestRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof ProductValidationRequest.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(ProductValidationRequest, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
