import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Restaurant,
  ArUser,
} from '../models';
import {RestaurantRepository} from '../repositories';

export class RestaurantArUserController {
  constructor(
    @repository(RestaurantRepository)
    public restaurantRepository: RestaurantRepository,
  ) { }

  @get('/restaurants/{id}/ar-user', {
    responses: {
      '200': {
        description: 'ArUser belonging to Restaurant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ArUser)},
          },
        },
      },
    },
  })
  async getArUser(
    @param.path.string('id') id: typeof Restaurant.prototype.id,
  ): Promise<ArUser> {
    return this.restaurantRepository.arUser(id);
  }
}
