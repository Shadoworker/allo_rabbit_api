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
  ProductValidationRequest,
  Product,
} from '../models';
import { ProductValidationRequestRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class ProductValidationRequestProductController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(ProductValidationRequestRepository)
    public productValidationRequestRepository: ProductValidationRequestRepository,
  ) { }

  @get('/product-validation-requests/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to ProductValidationRequest',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Product) },
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof ProductValidationRequest.prototype.id,
  ): Promise<Product> {
    return this.productValidationRequestRepository.product(id);
  }
}
