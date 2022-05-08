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
  Restaurant,
  RestaurantCategory,
} from '../models';
import {RestaurantRepository} from '../repositories';

export class RestaurantRestaurantCategoryController {
  constructor(
    @repository(RestaurantRepository) protected restaurantRepository: RestaurantRepository,
  ) { }

  @get('/restaurants/{id}/restaurant-category', {
    responses: {
      '200': {
        description: 'Restaurant has one RestaurantCategory',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RestaurantCategory),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<RestaurantCategory>,
  ): Promise<RestaurantCategory> {
    return this.restaurantRepository.restaurantCategory(id).get(filter);
  }

  @post('/restaurants/{id}/restaurant-category', {
    responses: {
      '200': {
        description: 'Restaurant model instance',
        content: {'application/json': {schema: getModelSchemaRef(RestaurantCategory)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Restaurant.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantCategory, {
            title: 'NewRestaurantCategoryInRestaurant',
            exclude: ['id'],
            optional: ['restaurantId']
          }),
        },
      },
    }) restaurantCategory: Omit<RestaurantCategory, 'id'>,
  ): Promise<RestaurantCategory> {
    return this.restaurantRepository.restaurantCategory(id).create(restaurantCategory);
  }

  @patch('/restaurants/{id}/restaurant-category', {
    responses: {
      '200': {
        description: 'Restaurant.RestaurantCategory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantCategory, {partial: true}),
        },
      },
    })
    restaurantCategory: Partial<RestaurantCategory>,
    @param.query.object('where', getWhereSchemaFor(RestaurantCategory)) where?: Where<RestaurantCategory>,
  ): Promise<Count> {
    return this.restaurantRepository.restaurantCategory(id).patch(restaurantCategory, where);
  }

  @del('/restaurants/{id}/restaurant-category', {
    responses: {
      '200': {
        description: 'Restaurant.RestaurantCategory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(RestaurantCategory)) where?: Where<RestaurantCategory>,
  ): Promise<Count> {
    return this.restaurantRepository.restaurantCategory(id).delete(where);
  }
}
