import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {ProductCategory, ProductCategoryRelations} from '../models';

export class ProductCategoryRepository extends DefaultCrudRepository<
  ProductCategory,
  typeof ProductCategory.prototype.id,
  ProductCategoryRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(ProductCategory, dataSource);
  }
}
