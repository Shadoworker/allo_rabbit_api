import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {Language, LanguageRelations} from '../models';

export class LanguageRepository extends DefaultCrudRepository<
  Language,
  typeof Language.prototype.id,
  LanguageRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(Language, dataSource);
  }
}
