import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {Restaurant, RestaurantRelations} from '../models';

export class RestaurantRepository extends DefaultCrudRepository<
  Restaurant,
  typeof Restaurant.prototype.id,
  RestaurantRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(Restaurant, dataSource);
  }
}
