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
  Restaurant,
  ArUser,
} from '../models';
import { RestaurantRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class RestaurantArUserController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(RestaurantRepository)
    public restaurantRepository: RestaurantRepository,
  ) { }

  @get('/restaurants/{id}/ar-user', {
    responses: {
      '200': {
        description: 'ArUser belonging to Restaurant',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(ArUser) },
          },
        },
      },
    },
  })
  async getArUser(
    @param.path.string('id') id: typeof Restaurant.prototype.id,
  ): Promise<ArUser> {
    return this.restaurantRepository.arUser(id);
  }
}
