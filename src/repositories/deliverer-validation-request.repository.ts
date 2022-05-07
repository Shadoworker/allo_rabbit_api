import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {DelivererValidationRequest, DelivererValidationRequestRelations} from '../models';

export class DelivererValidationRequestRepository extends DefaultCrudRepository<
  DelivererValidationRequest,
  typeof DelivererValidationRequest.prototype.id,
  DelivererValidationRequestRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(DelivererValidationRequest, dataSource);
  }
}
