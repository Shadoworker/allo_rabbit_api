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
  Deliverer,
  Order,
} from '../models';
import {DelivererRepository} from '../repositories';

export class DelivererOrderController {
  constructor(
    @repository(DelivererRepository) protected delivererRepository: DelivererRepository,
  ) { }

  @get('/deliverers/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Deliverer has many Order',
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
    return this.delivererRepository.orders(id).find(filter);
  }

  @post('/deliverers/{id}/orders', {
    responses: {
      '200': {
        description: 'Deliverer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Deliverer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInDeliverer',
            exclude: ['id'],
            optional: ['delivererId']
          }),
        },
      },
    }) order: Omit<Order, 'id'>,
  ): Promise<Order> {
    return this.delivererRepository.orders(id).create(order);
  }

  @patch('/deliverers/{id}/orders', {
    responses: {
      '200': {
        description: 'Deliverer.Order PATCH success count',
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
    return this.delivererRepository.orders(id).patch(order, where);
  }

  @del('/deliverers/{id}/orders', {
    responses: {
      '200': {
        description: 'Deliverer.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.delivererRepository.orders(id).delete(where);
  }
}
