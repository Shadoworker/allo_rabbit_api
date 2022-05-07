import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {Deliverer, DelivererRelations} from '../models';

export class DelivererRepository extends DefaultCrudRepository<
  Deliverer,
  typeof Deliverer.prototype.id,
  DelivererRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(Deliverer, dataSource);
  }
}
