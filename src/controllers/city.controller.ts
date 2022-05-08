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

import { City } from '../models';
import { CityRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';


// @authenticate('jwt')
export class CityController {
  constructor(
    // @inject(SecurityBindings.USER) private user: UserProfile,

    @repository(CityRepository)
    public cityRepository: CityRepository,
  ) { }


  // @authenticate.skip()
  @post('/cities')
  @response(200, {
    description: 'City model instance',
    content: { 'application/json': { schema: getModelSchemaRef(City) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(City, {
            title: 'NewCity',
            exclude: ['id'],
          }),
        },
      },
    })
    city: Omit<City, 'id'>,
  ): Promise<City> {
    return this.cityRepository.create(city);
  }

  // @authenticate.skip()
  @get('/cities/count')
  @response(200, {
    description: 'City model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(City) where?: Where<City>,
  ): Promise<Count> {
    return this.cityRepository.count(where);
  }


  // @authenticate.skip()
  @get('/cities')
  @response(200, {
    description: 'Array of City model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(City, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(City) filter?: Filter<City>,
  ): Promise<City[]> {
    return this.cityRepository.find(filter);
  }


  // @authenticate.skip()
  @patch('/cities')
  @response(200, {
    description: 'City PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(City, { partial: true }),
        },
      },
    })
    city: City,
    @param.where(City) where?: Where<City>,
  ): Promise<Count> {
    return this.cityRepository.updateAll(city, where);
  }

  // @authenticate.skip()
  @get('/cities/{id}')
  @response(200, {
    description: 'City model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(City, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(City, { exclude: 'where' }) filter?: FilterExcludingWhere<City>
  ): Promise<City> {
    return this.cityRepository.findById(id, filter);
  }

  // @authenticate.skip()
  @patch('/cities/{id}')
  @response(204, {
    description: 'City PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(City, { partial: true }),
        },
      },
    })
    city: City,
  ): Promise<void> {
    await this.cityRepository.updateById(id, city);
  }

  // @authenticate.skip()
  @put('/cities/{id}')
  @response(204, {
    description: 'City PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() city: City,
  ): Promise<void> {
    await this.cityRepository.replaceById(id, city);
  }

  // @authenticate.skip()
  @del('/cities/{id}')
  @response(204, {
    description: 'City DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cityRepository.deleteById(id);
  }
}
