// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { UserCredentials, UserCredentialsRepository } from '@loopback/authentication-jwt';
import { Getter, inject } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, juggler, repository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { ArUser, ArUserCredentials, ArUserRelations, Todo, TodoRelations } from '../models';
import { ArUserServiceBindings } from '../services/ar-user.bindings';
import { ArUserService, Credentials } from '../services/ar-user.service';
import { ArUserCredentialsRepository } from './ar-user-credentials.repository';

export class ArUserRepository extends DefaultCrudRepository<
  ArUser,
  typeof ArUser.prototype.id,
  ArUserRelations

> {


  public readonly arUserCredentials: HasOneRepositoryFactory<ArUserCredentials, typeof ArUser.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    // @inject(`datasources.${ArUserServiceBindings.DATASOURCE_NAME}`)
    // dataSource: juggler.DataSource,
    @repository.getter('ArUserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>, @repository.getter('ArUserCredentialsRepository') protected arUserCredentialsRepositoryGetter: Getter<ArUserCredentialsRepository>,
  ) {
    super(ArUser, dataSource);
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


  async findCredentials(
    userId: typeof ArUser.prototype.id,
  ): Promise<Credentials | undefined> {
    try {
      return await this.findById(userId);
    } catch (err: any) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
