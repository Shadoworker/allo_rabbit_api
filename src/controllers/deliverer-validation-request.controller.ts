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

import { DelivererValidationRequest } from '../models';
import { DelivererValidationRequestRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class DelivererValidationRequestController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(DelivererValidationRequestRepository)
    public delivererValidationRequestRepository: DelivererValidationRequestRepository,
  ) { }

  @post('/deliverer-validation-requests')
  @response(200, {
    description: 'DelivererValidationRequest model instance',
    content: { 'application/json': { schema: getModelSchemaRef(DelivererValidationRequest) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DelivererValidationRequest, {
            title: 'NewDelivererValidationRequest',
            exclude: ['id'],
          }),
        },
      },
    })
    delivererValidationRequest: Omit<DelivererValidationRequest, 'id'>,
  ): Promise<DelivererValidationRequest> {
    return this.delivererValidationRequestRepository.create(delivererValidationRequest);
  }

  @get('/deliverer-validation-requests/count')
  @response(200, {
    description: 'DelivererValidationRequest model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(DelivererValidationRequest) where?: Where<DelivererValidationRequest>,
  ): Promise<Count> {
    return this.delivererValidationRequestRepository.count(where);
  }

  @get('/deliverer-validation-requests')
  @response(200, {
    description: 'Array of DelivererValidationRequest model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DelivererValidationRequest, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(DelivererValidationRequest) filter?: Filter<DelivererValidationRequest>,
  ): Promise<DelivererValidationRequest[]> {
    return this.delivererValidationRequestRepository.find(filter);
  }

  @patch('/deliverer-validation-requests')
  @response(200, {
    description: 'DelivererValidationRequest PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DelivererValidationRequest, { partial: true }),
        },
      },
    })
    delivererValidationRequest: DelivererValidationRequest,
    @param.where(DelivererValidationRequest) where?: Where<DelivererValidationRequest>,
  ): Promise<Count> {
    return this.delivererValidationRequestRepository.updateAll(delivererValidationRequest, where);
  }

  @get('/deliverer-validation-requests/{id}')
  @response(200, {
    description: 'DelivererValidationRequest model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DelivererValidationRequest, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DelivererValidationRequest, { exclude: 'where' }) filter?: FilterExcludingWhere<DelivererValidationRequest>
  ): Promise<DelivererValidationRequest> {
    return this.delivererValidationRequestRepository.findById(id, filter);
  }

  @patch('/deliverer-validation-requests/{id}')
  @response(204, {
    description: 'DelivererValidationRequest PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DelivererValidationRequest, { partial: true }),
        },
      },
    })
    delivererValidationRequest: DelivererValidationRequest,
  ): Promise<void> {
    await this.delivererValidationRequestRepository.updateById(id, delivererValidationRequest);
  }

  @put('/deliverer-validation-requests/{id}')
  @response(204, {
    description: 'DelivererValidationRequest PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() delivererValidationRequest: DelivererValidationRequest,
  ): Promise<void> {
    await this.delivererValidationRequestRepository.replaceById(id, delivererValidationRequest);
  }

  @del('/deliverer-validation-requests/{id}')
  @response(204, {
    description: 'DelivererValidationRequest DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.delivererValidationRequestRepository.deleteById(id);
  }
}
