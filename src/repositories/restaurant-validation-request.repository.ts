import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {RestaurantValidationRequest, RestaurantValidationRequestRelations} from '../models';

export class RestaurantValidationRequestRepository extends DefaultCrudRepository<
  RestaurantValidationRequest,
  typeof RestaurantValidationRequest.prototype.id,
  RestaurantValidationRequestRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(RestaurantValidationRequest, dataSource);
  }
}
