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
    userCredentialsRepositoryGetter) {
        super(models_1.ArUser, dataSource);
        this.userCredentialsRepositoryGetter = userCredentialsRepositoryGetter;
        this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
        this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
    }
    async findCredentials(userId) {
        try {
            return await this.findById(userId);
        }
        catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
};
ArUserRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.db')),
    tslib_1.__param(1, repository_1.repository.getter('UserCredentialsRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource, Function])
], ArUserRepository);
exports.ArUserRepository = ArUserRepository;
//# sourceMappingURL=ar-user.repository.js.map