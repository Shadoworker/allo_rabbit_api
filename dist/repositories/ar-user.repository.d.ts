import { UserCredentials, UserCredentialsRepository } from '@loopback/authentication-jwt';
import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { ArUser, ArUserRelations } from '../models';
import { Credentials } from '../services/ar-user.service';
export declare class ArUserRepository extends DefaultCrudRepository<ArUser, typeof ArUser.prototype.id, ArUserRelations> {
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>;
    readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof ArUser.prototype.id>;
    constructor(dataSource: DbDataSource, userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>);
    findCredentials(userId: typeof ArUser.prototype.id): Promise<Credentials | undefined>;
}
