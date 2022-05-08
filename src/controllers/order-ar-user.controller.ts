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
  ArUser,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderArUserController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/ar-user', {
    responses: {
      '200': {
        description: 'ArUser belonging to Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ArUser)},
          },
        },
      },
    },
  })
  async getArUser(
    @param.path.string('id') id: typeof Order.prototype.id,
  ): Promise<ArUser> {
    return this.orderRepository.arUser(id);
  }
}
