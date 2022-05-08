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

import { Deliverer } from '../models';
import { DelivererRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

// @authenticate('jwt')
export class DelivererController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(DelivererRepository)
    public delivererRepository: DelivererRepository,
  ) { }

  @post('/deliverers')
  @response(200, {
    description: 'Deliverer model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Deliverer) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deliverer, {
            title: 'NewDeliverer',
            exclude: ['id'],
          }),
        },
      },
    })
    deliverer: Omit<Deliverer, 'id'>,
  ): Promise<Deliverer> {
    return this.delivererRepository.create(deliverer);
  }

  @get('/deliverers/count')
  @response(200, {
    description: 'Deliverer model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Deliverer) where?: Where<Deliverer>,
  ): Promise<Count> {
    return this.delivererRepository.count(where);
  }

  @get('/deliverers')
  @response(200, {
    description: 'Array of Deliverer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Deliverer, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Deliverer) filter?: Filter<Deliverer>,
  ): Promise<Deliverer[]> {
    return this.delivererRepository.find(filter);
  }

  @patch('/deliverers')
  @response(200, {
    description: 'Deliverer PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deliverer, { partial: true }),
        },
      },
    })
    deliverer: Deliverer,
    @param.where(Deliverer) where?: Where<Deliverer>,
  ): Promise<Count> {
    return this.delivererRepository.updateAll(deliverer, where);
  }

  @get('/deliverers/{id}')
  @response(200, {
    description: 'Deliverer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Deliverer, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Deliverer, { exclude: 'where' }) filter?: FilterExcludingWhere<Deliverer>
  ): Promise<Deliverer> {
    return this.delivererRepository.findById(id, filter);
  }

  @patch('/deliverers/{id}')
  @response(204, {
    description: 'Deliverer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deliverer, { partial: true }),
        },
      },
    })
    deliverer: Deliverer,
  ): Promise<void> {
    await this.delivererRepository.updateById(id, deliverer);
  }

  @put('/deliverers/{id}')
  @response(204, {
    description: 'Deliverer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() deliverer: Deliverer,
  ): Promise<void> {
    await this.delivererRepository.replaceById(id, deliverer);
  }

  @del('/deliverers/{id}')
  @response(204, {
    description: 'Deliverer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.delivererRepository.deleteById(id);
  }
}
