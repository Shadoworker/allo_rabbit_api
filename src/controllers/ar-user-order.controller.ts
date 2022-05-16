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
Order,
} from '../models';
import {ArUserRepository} from '../repositories';

export class ArUserOrderController {
  constructor(
    @repository(ArUserRepository) protected arUserRepository: ArUserRepository,
  ) { }

  @get('/ar-users/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of ArUser has many Order through Restaurant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.arUserRepository.orders(id).find(filter);
  }

  @post('/ar-users/{id}/orders', {
    responses: {
      '200': {
        description: 'create a Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ArUser.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInArUser',
            exclude: ['id'],
          }),
        },
      },
    }) order: Omit<Order, 'id'>,
  ): Promise<Order> {
    return this.arUserRepository.orders(id).create(order);
  }

  @patch('/ar-users/{id}/orders', {
    responses: {
      '200': {
        description: 'ArUser.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.arUserRepository.orders(id).patch(order, where);
  }

  @del('/ar-users/{id}/orders', {
    responses: {
      '200': {
        description: 'ArUser.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.arUserRepository.orders(id).delete(where);
  }
}
