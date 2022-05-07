import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { ArUser, ArUserCredentials, ArUserRelations } from '../models';
import { ArUserCredentialsRepository } from './ar-user-credentials.repository';
export declare class ArUserRepository extends DefaultCrudRepository<ArUser, typeof ArUser.prototype.id, ArUserRelations> {
    protected userCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>;
    protected arUserCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>;
    readonly arUserCredentials: HasOneRepositoryFactory<ArUserCredentials, typeof ArUser.prototype.id>;
    constructor(dataSource: DbDataSource, userCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>, arUserCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>);
}
