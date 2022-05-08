import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Order,
  Restaurant,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderRestaurantController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/restaurant', {
    responses: {
      '200': {
        description: 'Restaurant belonging to Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Restaurant)},
          },
        },
      },
    },
  })
  async getRestaurant(
    @param.path.string('id') id: typeof Order.prototype.id,
  ): Promise<Restaurant> {
    return this.orderRepository.restaurant(id);
  }
}
