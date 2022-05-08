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
  Order,
  Restaurant,
} from '../models';
import { OrderRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class OrderRestaurantController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/restaurant', {
    responses: {
      '200': {
        description: 'Restaurant belonging to Order',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Restaurant) },
          },
        },
      },
    },
  })
  async getRestaurant(
    @param.path.string('id') id: typeof Order.prototype.id,
  ): Promise<Restaurant> {
    return this.orderRepository.restaurant(id);
  }
}
