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
let ArUserRepository = class ArUserRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, 
    // @inject(`datasources.${ArUserServiceBindings.DATASOURCE_NAME}`)
    // dataSource: juggler.DataSource,
    userCredentialsRepositoryGetter, arUserCredentialsRepositoryGetter, rolesRepositoryGetter) {
        super(models_1.ArUser, dataSource);
        this.userCredentialsRepositoryGetter = userCredentialsRepositoryGetter;
        this.arUserCredentialsRepositoryGetter = arUserCredentialsRepositoryGetter;
        this.rolesRepositoryGetter = rolesRepositoryGetter;
        this.roles = this.createHasManyRepositoryFactoryFor('roles', rolesRepositoryGetter);
        this.registerInclusionResolver('roles', this.roles.inclusionResolver);
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
    tslib_1.__param(3, repository_1.repository.getter('RolesRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDatasourceDataSource, Function, Function, Function])
], ArUserRepository);
exports.ArUserRepository = ArUserRepository;
//# sourceMappingURL=ar-user.repository.js.map