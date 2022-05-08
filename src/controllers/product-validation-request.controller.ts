import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { SecurityBindings, UserProfile } from '../loopauth/security/src';

import { ProductValidationRequest } from '../models';
import { ProductValidationRequestRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class ProductValidationRequestController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(ProductValidationRequestRepository)
    public productValidationRequestRepository: ProductValidationRequestRepository,
  ) { }

  @post('/product-validation-requests')
  @response(200, {
    description: 'ProductValidationRequest model instance',
    content: { 'application/json': { schema: getModelSchemaRef(ProductValidationRequest) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductValidationRequest, {
            title: 'NewProductValidationRequest',
            exclude: ['id'],
          }),
        },
      },
    })
    productValidationRequest: Omit<ProductValidationRequest, 'id'>,
  ): Promise<ProductValidationRequest> {
    return this.productValidationRequestRepository.create(productValidationRequest);
  }

  @get('/product-validation-requests/count')
  @response(200, {
    description: 'ProductValidationRequest model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(ProductValidationRequest) where?: Where<ProductValidationRequest>,
  ): Promise<Count> {
    return this.productValidationRequestRepository.count(where);
  }

  @get('/product-validation-requests')
  @response(200, {
    description: 'Array of ProductValidationRequest model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductValidationRequest, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(ProductValidationRequest) filter?: Filter<ProductValidationRequest>,
  ): Promise<ProductValidationRequest[]> {
    return this.productValidationRequestRepository.find(filter);
  }

  @patch('/product-validation-requests')
  @response(200, {
    description: 'ProductValidationRequest PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductValidationRequest, { partial: true }),
        },
      },
    })
    productValidationRequest: ProductValidationRequest,
    @param.where(ProductValidationRequest) where?: Where<ProductValidationRequest>,
  ): Promise<Count> {
    return this.productValidationRequestRepository.updateAll(productValidationRequest, where);
  }

  @get('/product-validation-requests/{id}')
  @response(200, {
    description: 'ProductValidationRequest model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductValidationRequest, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductValidationRequest, { exclude: 'where' }) filter?: FilterExcludingWhere<ProductValidationRequest>
  ): Promise<ProductValidationRequest> {
    return this.productValidationRequestRepository.findById(id, filter);
  }

  @patch('/product-validation-requests/{id}')
  @response(204, {
    description: 'ProductValidationRequest PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductValidationRequest, { partial: true }),
        },
      },
    })
    productValidationRequest: ProductValidationRequest,
  ): Promise<void> {
    await this.productValidationRequestRepository.updateById(id, productValidationRequest);
  }

  @put('/product-validation-requests/{id}')
  @response(204, {
    description: 'ProductValidationRequest PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productValidationRequest: ProductValidationRequest,
  ): Promise<void> {
    await this.productValidationRequestRepository.replaceById(id, productValidationRequest);
  }

  @del('/product-validation-requests/{id}')
  @response(204, {
    description: 'ProductValidationRequest DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productValidationRequestRepository.deleteById(id);
  }
}
