import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {RestaurantCategory, RestaurantCategoryRelations} from '../models';

export class RestaurantCategoryRepository extends DefaultCrudRepository<
  RestaurantCategory,
  typeof RestaurantCategory.prototype.id,
  RestaurantCategoryRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(RestaurantCategory, dataSource);
  }
}
