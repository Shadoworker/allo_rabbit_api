import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import { SecurityBindings, UserProfile } from '../loopauth/security/src';

import {
  Deliverer,
  ArUser,
} from '../models';
import { DelivererRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

// @authenticate('jwt')
export class DelivererArUserController {
  constructor(
    // @inject(SecurityBindings.USER) private user: UserProfile,

    @repository(DelivererRepository)
    public delivererRepository: DelivererRepository,
  ) { }

  @get('/deliverers/{id}/ar-user', {
    responses: {
      '200': {
        description: 'ArUser belonging to Deliverer',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(ArUser) },
          },
        },
      },
    },
  })
  async getArUser(
    @param.path.string('id') id: typeof Deliverer.prototype.id,
  ): Promise<ArUser> {
    return this.delivererRepository.arUser(id);
  }
}
