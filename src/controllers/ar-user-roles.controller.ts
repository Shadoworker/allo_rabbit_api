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
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import { SecurityBindings, UserProfile } from '../loopauth/security/src';

import {
  ArUser,
  Roles,
} from '../models';
import { ArUserRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

export class ArUserRolesController {
  constructor(
    // @inject(SecurityBindings.USER) private user: UserProfile,

    @repository(ArUserRepository) protected arUserRepository: ArUserRepository,
  ) { }

  @get('/ar-users/{id}/roles', {
    responses: {
      '200': {
        description: 'Array of ArUser has many Roles',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Roles) },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Roles>,
  ): Promise<Roles[]> {
    return this.arUserRepository.roles(id).find(filter);
  }

  @post('/ar-users/{id}/roles', {
    responses: {
      '200': {
        description: 'ArUser model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Roles) } },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ArUser.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {
            title: 'NewRolesInArUser',
            exclude: ['id'],
            optional: ['arUserId']
          }),
        },
      },
    }) roles: Omit<Roles, 'id'>,
  ): Promise<Roles> {
    return this.arUserRepository.roles(id).create(roles);
  }

  @patch('/ar-users/{id}/roles', {
    responses: {
      '200': {
        description: 'ArUser.Roles PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, { partial: true }),
        },
      },
    })
    roles: Partial<Roles>,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.arUserRepository.roles(id).patch(roles, where);
  }

  @del('/ar-users/{id}/roles', {
    responses: {
      '200': {
        description: 'ArUser.Roles DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.arUserRepository.roles(id).delete(where);
  }
}
