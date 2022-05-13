"use strict";
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArUserRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
// import { RolesRepository } from './roles.repository';
let ArUserRepository = class ArUserRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, 
    // @inject(`datasources.${ArUserServiceBindings.DATASOURCE_NAME}`)
    // dataSource: juggler.DataSource,
    userCredentialsRepositoryGetter, arUserCredentialsRepositoryGetter, restaurantRepositoryGetter, productCategoryRepositoryGetter) {
        super(models_1.ArUser, dataSource);
        this.userCredentialsRepositoryGetter = userCredentialsRepositoryGetter;
        this.arUserCredentialsRepositoryGetter = arUserCredentialsRepositoryGetter;
        this.restaurantRepositoryGetter = restaurantRepositoryGetter;
        this.productCategoryRepositoryGetter = productCategoryRepositoryGetter;
        this.productCategories = this.createHasManyRepositoryFactoryFor('productCategories', productCategoryRepositoryGetter);
        this.registerInclusionResolver('productCategories', this.productCategories.inclusionResolver);
        this.restaurants = this.createHasManyRepositoryFactoryFor('restaurants', restaurantRepositoryGetter);
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
};
ArUserRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysqlDatasource')),
    tslib_1.__param(1, repository_1.repository.getter('ArUserCredentialsRepository')),
    tslib_1.__param(2, repository_1.repository.getter('ArUserCredentialsRepository')),
    tslib_1.__param(3, repository_1.repository.getter('RestaurantRepository')),
    tslib_1.__param(4, repository_1.repository.getter('ProductCategoryRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDatasourceDataSource, Function, Function, Function, Function])
], ArUserRepository);
exports.ArUserRepository = ArUserRepository;
//# sourceMappingURL=ar-user.repository.js.map