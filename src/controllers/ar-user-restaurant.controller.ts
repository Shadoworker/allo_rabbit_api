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
import {
  ArUser,
  Restaurant,
} from '../models';
import {ArUserRepository} from '../repositories';

export class ArUserRestaurantController {
  constructor(
    @repository(ArUserRepository) protected arUserRepository: ArUserRepository,
  ) { }

  @get('/ar-users/{id}/restaurants', {
    responses: {
      '200': {
        description: 'Array of ArUser has many Restaurant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Restaurant)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Restaurant>,
  ): Promise<Restaurant[]> {
    return this.arUserRepository.restaurants(id).find(filter);
  }

  @post('/ar-users/{id}/restaurants', {
    responses: {
      '200': {
        description: 'ArUser model instance',
        content: {'application/json': {schema: getModelSchemaRef(Restaurant)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ArUser.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurant, {
            title: 'NewRestaurantInArUser',
            exclude: ['id'],
            optional: ['arUserId']
          }),
        },
      },
    }) restaurant: Omit<Restaurant, 'id'>,
  ): Promise<Restaurant> {
    return this.arUserRepository.restaurants(id).create(restaurant);
  }

  @patch('/ar-users/{id}/restaurants', {
    responses: {
      '200': {
        description: 'ArUser.Restaurant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurant, {partial: true}),
        },
      },
    })
    restaurant: Partial<Restaurant>,
    @param.query.object('where', getWhereSchemaFor(Restaurant)) where?: Where<Restaurant>,
  ): Promise<Count> {
    return this.arUserRepository.restaurants(id).patch(restaurant, where);
  }

  @del('/ar-users/{id}/restaurants', {
    responses: {
      '200': {
        description: 'ArUser.Restaurant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Restaurant)) where?: Where<Restaurant>,
  ): Promise<Count> {
    return this.arUserRepository.restaurants(id).delete(where);
  }
}
