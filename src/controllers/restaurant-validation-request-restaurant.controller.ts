import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RestaurantValidationRequest,
  Restaurant,
} from '../models';
import {RestaurantValidationRequestRepository} from '../repositories';

export class RestaurantValidationRequestRestaurantController {
  constructor(
    @repository(RestaurantValidationRequestRepository)
    public restaurantValidationRequestRepository: RestaurantValidationRequestRepository,
  ) { }

  @get('/restaurant-validation-requests/{id}/restaurant', {
    responses: {
      '200': {
        description: 'Restaurant belonging to RestaurantValidationRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Restaurant)},
          },
        },
      },
    },
  })
  async getRestaurant(
    @param.path.string('id') id: typeof RestaurantValidationRequest.prototype.id,
  ): Promise<Restaurant> {
    return this.restaurantValidationRequestRepository.restaurant(id);
  }
}
