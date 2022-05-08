import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  OperationVisibility,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import { SecurityBindings, UserProfile } from '../loopauth/security/src';

import {
  ArUser,
  ArUserCredentials,
} from '../models';
import { ArUserRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

export class ArUserArUserCredentialsController {
  constructor(
    // @inject(SecurityBindings.USER) private user: UserProfile,

    @repository(ArUserRepository) protected arUserRepository: ArUserRepository,
  ) { }

  @get('/ar-users/{id}/ar-user-credentials', {
    responses: {
      '200': {
        description: 'ArUser has one ArUserCredentials',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ArUserCredentials),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ArUserCredentials>,
  ): Promise<ArUserCredentials> {
    return this.arUserRepository.arUserCredentials(id).get(filter);
  }

  @post('/ar-users/{id}/ar-user-credentials', {
    responses: {
      '200': {
        description: 'ArUser model instance',
        content: { 'application/json': { schema: getModelSchemaRef(ArUserCredentials) } },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ArUser.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArUserCredentials, {
            title: 'NewArUserCredentialsInArUser',
            exclude: ['id'],
            optional: ['arUserId']
          }),
        },
      },
    }) arUserCredentials: Omit<ArUserCredentials, 'id'>,
  ): Promise<ArUserCredentials> {
    return this.arUserRepository.arUserCredentials(id).create(arUserCredentials);
  }

  @patch('/ar-users/{id}/ar-user-credentials', {
    responses: {
      '200': {
        description: 'ArUser.ArUserCredentials PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArUserCredentials, { partial: true }),
        },
      },
    })
    arUserCredentials: Partial<ArUserCredentials>,
    @param.query.object('where', getWhereSchemaFor(ArUserCredentials)) where?: Where<ArUserCredentials>,
  ): Promise<Count> {
    return this.arUserRepository.arUserCredentials(id).patch(arUserCredentials, where);
  }

  @del('/ar-users/{id}/ar-user-credentials', {
    responses: {
      '200': {
        description: 'ArUser.ArUserCredentials DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ArUserCredentials)) where?: Where<ArUserCredentials>,
  ): Promise<Count> {
    return this.arUserRepository.arUserCredentials(id).delete(where);
  }
}
