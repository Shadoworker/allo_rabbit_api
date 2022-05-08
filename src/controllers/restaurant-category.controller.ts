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

import { RestaurantCategory } from '../models';
import { RestaurantCategoryRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class RestaurantCategoryController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(RestaurantCategoryRepository)
    public restaurantCategoryRepository: RestaurantCategoryRepository,
  ) { }

  @post('/restaurant-categories')
  @response(200, {
    description: 'RestaurantCategory model instance',
    content: { 'application/json': { schema: getModelSchemaRef(RestaurantCategory) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantCategory, {
            title: 'NewRestaurantCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    restaurantCategory: Omit<RestaurantCategory, 'id'>,
  ): Promise<RestaurantCategory> {
    return this.restaurantCategoryRepository.create(restaurantCategory);
  }

  @get('/restaurant-categories/count')
  @response(200, {
    description: 'RestaurantCategory model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(RestaurantCategory) where?: Where<RestaurantCategory>,
  ): Promise<Count> {
    return this.restaurantCategoryRepository.count(where);
  }

  @get('/restaurant-categories')
  @response(200, {
    description: 'Array of RestaurantCategory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RestaurantCategory, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(RestaurantCategory) filter?: Filter<RestaurantCategory>,
  ): Promise<RestaurantCategory[]> {
    return this.restaurantCategoryRepository.find(filter);
  }

  @patch('/restaurant-categories')
  @response(200, {
    description: 'RestaurantCategory PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantCategory, { partial: true }),
        },
      },
    })
    restaurantCategory: RestaurantCategory,
    @param.where(RestaurantCategory) where?: Where<RestaurantCategory>,
  ): Promise<Count> {
    return this.restaurantCategoryRepository.updateAll(restaurantCategory, where);
  }

  @get('/restaurant-categories/{id}')
  @response(200, {
    description: 'RestaurantCategory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RestaurantCategory, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RestaurantCategory, { exclude: 'where' }) filter?: FilterExcludingWhere<RestaurantCategory>
  ): Promise<RestaurantCategory> {
    return this.restaurantCategoryRepository.findById(id, filter);
  }

  @patch('/restaurant-categories/{id}')
  @response(204, {
    description: 'RestaurantCategory PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantCategory, { partial: true }),
        },
      },
    })
    restaurantCategory: RestaurantCategory,
  ): Promise<void> {
    await this.restaurantCategoryRepository.updateById(id, restaurantCategory);
  }

  @put('/restaurant-categories/{id}')
  @response(204, {
    description: 'RestaurantCategory PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() restaurantCategory: RestaurantCategory,
  ): Promise<void> {
    await this.restaurantCategoryRepository.replaceById(id, restaurantCategory);
  }

  @del('/restaurant-categories/{id}')
  @response(204, {
    description: 'RestaurantCategory DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.restaurantCategoryRepository.deleteById(id);
  }
}
