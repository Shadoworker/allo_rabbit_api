import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDatasourceDataSource } from '../datasources';
import { ArUser, ArUserCredentials, ArUserRelations, Roles } from '../models';
import { ArUserCredentialsRepository } from './ar-user-credentials.repository';
import { RolesRepository } from './roles.repository';
export declare class ArUserRepository extends DefaultCrudRepository<ArUser, typeof ArUser.prototype.id, ArUserRelations> {
    protected userCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>;
    protected arUserCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>;
    protected rolesRepositoryGetter: Getter<RolesRepository>;
    readonly arUserCredentials: HasOneRepositoryFactory<ArUserCredentials, typeof ArUser.prototype.id>;
    readonly roles: HasManyRepositoryFactory<Roles, typeof ArUser.prototype.id>;
    constructor(dataSource: MysqlDatasourceDataSource, userCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>, arUserCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>, rolesRepositoryGetter: Getter<RolesRepository>);
}
