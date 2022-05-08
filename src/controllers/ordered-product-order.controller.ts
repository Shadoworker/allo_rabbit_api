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
  OrderedProduct,
  Order,
} from '../models';
import { OrderedProductRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class OrderedProductOrderController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(OrderedProductRepository)
    public orderedProductRepository: OrderedProductRepository,
  ) { }

  @get('/ordered-products/{id}/order', {
    responses: {
      '200': {
        description: 'Order belonging to OrderedProduct',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Order) },
          },
        },
      },
    },
  })
  async getOrder(
    @param.path.string('id') id: typeof OrderedProduct.prototype.id,
  ): Promise<Order> {
    return this.orderedProductRepository.order(id);
  }
}
