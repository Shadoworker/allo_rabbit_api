import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDatasourceDataSource } from '../datasources';
import { ArUser, ArUserCredentials, ArUserRelations, Restaurant } from '../models';
import { ArUserCredentialsRepository } from './ar-user-credentials.repository';
import { RestaurantRepository } from './restaurant.repository';
export declare class ArUserRepository extends DefaultCrudRepository<ArUser, typeof ArUser.prototype.id, ArUserRelations> {
    protected userCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>;
    protected arUserCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>;
    protected restaurantRepositoryGetter: Getter<RestaurantRepository>;
    readonly arUserCredentials: HasOneRepositoryFactory<ArUserCredentials, typeof ArUser.prototype.id>;
    readonly restaurants: HasManyRepositoryFactory<Restaurant, typeof ArUser.prototype.id>;
    constructor(dataSource: MysqlDatasourceDataSource, userCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>, arUserCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>, restaurantRepositoryGetter: Getter<RestaurantRepository>);
}
