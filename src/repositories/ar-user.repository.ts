// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { UserCredentials, UserCredentialsRepository } from '@loopback/authentication-jwt';
import { Getter, inject } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, juggler, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import { DbDataSource, MysqlDatasourceDataSource } from '../datasources';
import { ArUser, ArUserCredentials, ArUserRelations, Restaurant, ProductCategory, Order} from '../models';
import { ArUserService, Credentials } from '../services/ar-user.service';
import { ArUserCredentialsRepository } from './ar-user-credentials.repository';
import {RestaurantRepository} from './restaurant.repository';
import {ProductCategoryRepository} from './product-category.repository';
import {OrderRepository} from './order.repository';

// import { RolesRepository } from './roles.repository';

export class ArUserRepository extends DefaultCrudRepository<
  ArUser,
  typeof ArUser.prototype.id,
  ArUserRelations

> {


  public readonly arUserCredentials: HasOneRepositoryFactory<ArUserCredentials, typeof ArUser.prototype.id>;

  public readonly restaurants: HasManyRepositoryFactory<Restaurant, typeof ArUser.prototype.id>;

  public readonly productCategories: HasManyRepositoryFactory<ProductCategory, typeof ArUser.prototype.id>;

  public readonly orders: HasManyThroughRepositoryFactory<Order, typeof Order.prototype.id,
          Restaurant,
          typeof ArUser.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
    // @inject(`datasources.${ArUserServiceBindings.DATASOURCE_NAME}`)
    // dataSource: juggler.DataSource,
    @repository.getter('ArUserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>, @repository.getter('ArUserCredentialsRepository') protected arUserCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>, @repository.getter('RestaurantRepository') protected restaurantRepositoryGetter: Getter<RestaurantRepository>, @repository.getter('ProductCategoryRepository') protected productCategoryRepositoryGetter: Getter<ProductCategoryRepository>, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(ArUser, dataSource);
    this.orders = this.createHasManyThroughRepositoryFactoryFor('orders', orderRepositoryGetter, restaurantRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.productCategories = this.createHasManyRepositoryFactoryFor('productCategories', productCategoryRepositoryGetter,);
    this.registerInclusionResolver('productCategories', this.productCategories.inclusionResolver);
    this.restaurants = this.createHasManyRepositoryFactoryFor('restaurants', restaurantRepositoryGetter,);
    this.registerInclusionResolver('restaurants', this.restaurants.inclusionResolver);

    this.arUserCredentials = this.createHasOneRepositoryFactoryFor('arUserCredentials', arUserCredentialsRepositoryGetter);
    this.registerInclusionResolver('arUserCredentials', this.arUserCredentials.inclusionResolver);

    // this.arUserCredentials = this.createHasOneRepositoryFactoryFor(
    //   'userCredentials',
    //   userCredentialsRepositoryGetter,
    // );
    // this.registerInclusionResolver(
    //   'userCredentials',
    //   this.arUserCredentials.inclusionResolver,
    // );
  }


  // async findCredentials(
  //   arUserId: typeof ArUser.prototype.id,
  // ): Promise<Credentials | undefined> {

  //   try {
  //     return await this.findById(arUserId);
  //   } catch (err: any) {
  //     if (err.code === 'ENTITY_NOT_FOUND') {
  //       return undefined;
  //     }
  //     throw err;
  //   }
  // }
}
