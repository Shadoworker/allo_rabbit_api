import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDatasourceDataSource } from '../datasources';
import { Roles, RolesRelations, ArUser } from '../models';
import { ArUserRepository } from './ar-user.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {


  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(Roles, dataSource);

  }
}
