import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, HasManyRepositoryFactory, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { MysqlDatasourceDataSource } from '../datasources';
import { ArUser, ArUserCredentials, ArUserRelations, Restaurant, ProductCategory, Order } from '../models';
import { ArUserCredentialsRepository } from './ar-user-credentials.repository';
import { RestaurantRepository } from './restaurant.repository';
import { ProductCategoryRepository } from './product-category.repository';
import { OrderRepository } from './order.repository';
export declare class ArUserRepository extends DefaultCrudRepository<ArUser, typeof ArUser.prototype.id, ArUserRelations> {
    protected userCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>;
    protected arUserCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>;
    protected restaurantRepositoryGetter: Getter<RestaurantRepository>;
    protected productCategoryRepositoryGetter: Getter<ProductCategoryRepository>;
    protected orderRepositoryGetter: Getter<OrderRepository>;
    readonly arUserCredentials: HasOneRepositoryFactory<ArUserCredentials, typeof ArUser.prototype.id>;
    readonly restaurants: HasManyRepositoryFactory<Restaurant, typeof ArUser.prototype.id>;
    readonly productCategories: HasManyRepositoryFactory<ProductCategory, typeof ArUser.prototype.id>;
    readonly orders: HasManyThroughRepositoryFactory<Order, typeof Order.prototype.id, Restaurant, typeof ArUser.prototype.id>;
    constructor(dataSource: MysqlDatasourceDataSource, userCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>, arUserCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>, restaurantRepositoryGetter: Getter<RestaurantRepository>, productCategoryRepositoryGetter: Getter<ProductCategoryRepository>, orderRepositoryGetter: Getter<OrderRepository>);
}
