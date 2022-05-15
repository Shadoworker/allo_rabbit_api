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
  Order,
  Deliverer,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderDelivererController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/deliverer', {
    responses: {
      '200': {
        description: 'Order has one Deliverer',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Deliverer),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Deliverer>,
  ): Promise<Deliverer> {
    return this.orderRepository.deliverer(id).get(filter);
  }

  @post('/orders/{id}/deliverer', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(Deliverer)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deliverer, {
            title: 'NewDelivererInOrder',
            exclude: ['id'],
            optional: ['orderId']
          }),
        },
      },
    }) deliverer: Omit<Deliverer, 'id'>,
  ): Promise<Deliverer> {
    return this.orderRepository.deliverer(id).create(deliverer);
  }

  @patch('/orders/{id}/deliverer', {
    responses: {
      '200': {
        description: 'Order.Deliverer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deliverer, {partial: true}),
        },
      },
    })
    deliverer: Partial<Deliverer>,
    @param.query.object('where', getWhereSchemaFor(Deliverer)) where?: Where<Deliverer>,
  ): Promise<Count> {
    return this.orderRepository.deliverer(id).patch(deliverer, where);
  }

  @del('/orders/{id}/deliverer', {
    responses: {
      '200': {
        description: 'Order.Deliverer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Deliverer)) where?: Where<Deliverer>,
  ): Promise<Count> {
    return this.orderRepository.deliverer(id).delete(where);
  }
}
