import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {ProductValidationRequest, ProductValidationRequestRelations} from '../models';

export class ProductValidationRequestRepository extends DefaultCrudRepository<
  ProductValidationRequest,
  typeof ProductValidationRequest.prototype.id,
  ProductValidationRequestRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(ProductValidationRequest, dataSource);
  }
}
