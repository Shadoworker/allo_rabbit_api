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

import { RestaurantValidationRequest } from '../models';
import { RestaurantValidationRequestRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class RestaurantValidationRequestController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(RestaurantValidationRequestRepository)
    public restaurantValidationRequestRepository: RestaurantValidationRequestRepository,
  ) { }

  @post('/restaurant-validation-requests')
  @response(200, {
    description: 'RestaurantValidationRequest model instance',
    content: { 'application/json': { schema: getModelSchemaRef(RestaurantValidationRequest) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantValidationRequest, {
            title: 'NewRestaurantValidationRequest',
            exclude: ['id'],
          }),
        },
      },
    })
    restaurantValidationRequest: Omit<RestaurantValidationRequest, 'id'>,
  ): Promise<RestaurantValidationRequest> {
    return this.restaurantValidationRequestRepository.create(restaurantValidationRequest);
  }

  @get('/restaurant-validation-requests/count')
  @response(200, {
    description: 'RestaurantValidationRequest model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(RestaurantValidationRequest) where?: Where<RestaurantValidationRequest>,
  ): Promise<Count> {
    return this.restaurantValidationRequestRepository.count(where);
  }

  @get('/restaurant-validation-requests')
  @response(200, {
    description: 'Array of RestaurantValidationRequest model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RestaurantValidationRequest, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(RestaurantValidationRequest) filter?: Filter<RestaurantValidationRequest>,
  ): Promise<RestaurantValidationRequest[]> {
    return this.restaurantValidationRequestRepository.find(filter);
  }

  @patch('/restaurant-validation-requests')
  @response(200, {
    description: 'RestaurantValidationRequest PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantValidationRequest, { partial: true }),
        },
      },
    })
    restaurantValidationRequest: RestaurantValidationRequest,
    @param.where(RestaurantValidationRequest) where?: Where<RestaurantValidationRequest>,
  ): Promise<Count> {
    return this.restaurantValidationRequestRepository.updateAll(restaurantValidationRequest, where);
  }

  @get('/restaurant-validation-requests/{id}')
  @response(200, {
    description: 'RestaurantValidationRequest model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RestaurantValidationRequest, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RestaurantValidationRequest, { exclude: 'where' }) filter?: FilterExcludingWhere<RestaurantValidationRequest>
  ): Promise<RestaurantValidationRequest> {
    return this.restaurantValidationRequestRepository.findById(id, filter);
  }

  @patch('/restaurant-validation-requests/{id}')
  @response(204, {
    description: 'RestaurantValidationRequest PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantValidationRequest, { partial: true }),
        },
      },
    })
    restaurantValidationRequest: RestaurantValidationRequest,
  ): Promise<void> {
    await this.restaurantValidationRequestRepository.updateById(id, restaurantValidationRequest);
  }

  @put('/restaurant-validation-requests/{id}')
  @response(204, {
    description: 'RestaurantValidationRequest PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() restaurantValidationRequest: RestaurantValidationRequest,
  ): Promise<void> {
    await this.restaurantValidationRequestRepository.replaceById(id, restaurantValidationRequest);
  }

  @del('/restaurant-validation-requests/{id}')
  @response(204, {
    description: 'RestaurantValidationRequest DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.restaurantValidationRequestRepository.deleteById(id);
  }
}
