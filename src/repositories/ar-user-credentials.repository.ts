// import { DefaultCrudRepository, juggler } from '@loopback/repository';
// import { ArUserCredentials, ArUserCredentialsRelations } from '../models';
// export declare class ArUserCredentialsRepository extends DefaultCrudRepository<ArUserCredentials, typeof ArUserCredentials.prototype.id, ArUserCredentialsRelations> {
//   constructor(dataSource: juggler.DataSource);
// }

// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { inject } from '@loopback/core';
import { DefaultCrudRepository, juggler } from '@loopback/repository';
// import {UserServiceBindings} from '../keys';
import { ArUser, ArUserCredentials, ArUserCredentialsRelations } from '../models';
import { Credentials } from '../services/ar-user.service';

export class ArUserCredentialsRepository extends DefaultCrudRepository<
  ArUserCredentials,
  typeof ArUserCredentials.prototype.id,
  ArUserCredentialsRelations
> {
  constructor(
    @inject(`datasources.db`)
    dataSource: juggler.DataSource,
  ) {
    super(ArUserCredentials, dataSource);
  }



  // async findCredentials(
  //   arUserId: typeof ArUser.prototype.id,
  // ): Promise<Credentials | undefined> {

  //   // try {
  //     return await this.findById(arUserId);
  //   // } catch (err: any) {
  //   //   if (err.code === 'ENTITY_NOT_FOUND') {
  //   //     return undefined;
  //   //   }
  //   //   throw err;
  //   // }
  // }
}
