import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {Sos, SosRelations} from '../models';

export class SosRepository extends DefaultCrudRepository<
  Sos,
  typeof Sos.prototype.id,
  SosRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(Sos, dataSource);
  }
}
