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
import { SecurityBindings, UserProfile } from '../loopauth/security/src';

import {
  Order,
  Currency,
} from '../models';
import { OrderRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class OrderCurrencyController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/currency', {
    responses: {
      '200': {
        description: 'Order has one Currency',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Currency),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Currency>,
  ): Promise<Currency> {
    return this.orderRepository.currency(id).get(filter);
  }

  @post('/orders/{id}/currency', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Currency) } },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, {
            title: 'NewCurrencyInOrder',
            exclude: ['id'],
            optional: ['orderId']
          }),
        },
      },
    }) currency: Omit<Currency, 'id'>,
  ): Promise<Currency> {
    return this.orderRepository.currency(id).create(currency);
  }

  @patch('/orders/{id}/currency', {
    responses: {
      '200': {
        description: 'Order.Currency PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, { partial: true }),
        },
      },
    })
    currency: Partial<Currency>,
    @param.query.object('where', getWhereSchemaFor(Currency)) where?: Where<Currency>,
  ): Promise<Count> {
    return this.orderRepository.currency(id).patch(currency, where);
  }

  @del('/orders/{id}/currency', {
    responses: {
      '200': {
        description: 'Order.Currency DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Currency)) where?: Where<Currency>,
  ): Promise<Count> {
    return this.orderRepository.currency(id).delete(where);
  }
}
