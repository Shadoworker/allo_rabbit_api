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
  RestaurantValidationRequest,
  Restaurant,
} from '../models';
import { RestaurantValidationRequestRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class RestaurantValidationRequestRestaurantController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(RestaurantValidationRequestRepository)
    public restaurantValidationRequestRepository: RestaurantValidationRequestRepository,
  ) { }

  @get('/restaurant-validation-requests/{id}/restaurant', {
    responses: {
      '200': {
        description: 'Restaurant belonging to RestaurantValidationRequest',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Restaurant) },
          },
        },
      },
    },
  })
  async getRestaurant(
    @param.path.string('id') id: typeof RestaurantValidationRequest.prototype.id,
  ): Promise<Restaurant> {
    return this.restaurantValidationRequestRepository.restaurant(id);
  }
}
