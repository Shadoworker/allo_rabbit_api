import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { SecurityBindings, UserProfile } from '../loopauth/security/src';

import { Currency } from '../models';
import { CurrencyRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

// @authenticate('jwt')
export class CurrencyController {
  constructor(
    // @inject(SecurityBindings.USER) private user: UserProfile,

    @repository(CurrencyRepository)
    public currencyRepository: CurrencyRepository,
  ) { }

  @post('/currencies')
  @response(200, {
    description: 'Currency model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Currency) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, {
            title: 'NewCurrency',
            exclude: ['id'],
          }),
        },
      },
    })
    currency: Omit<Currency, 'id'>,
  ): Promise<Currency> {
    return this.currencyRepository.create(currency);
  }

  @get('/currencies/count')
  @response(200, {
    description: 'Currency model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Currency) where?: Where<Currency>,
  ): Promise<Count> {
    return this.currencyRepository.count(where);
  }

  @get('/currencies')
  @response(200, {
    description: 'Array of Currency model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Currency, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Currency) filter?: Filter<Currency>,
  ): Promise<Currency[]> {
    return this.currencyRepository.find(filter);
  }

  @patch('/currencies')
  @response(200, {
    description: 'Currency PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, { partial: true }),
        },
      },
    })
    currency: Currency,
    @param.where(Currency) where?: Where<Currency>,
  ): Promise<Count> {
    return this.currencyRepository.updateAll(currency, where);
  }

  @get('/currencies/{id}')
  @response(200, {
    description: 'Currency model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Currency, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Currency, { exclude: 'where' }) filter?: FilterExcludingWhere<Currency>
  ): Promise<Currency> {
    return this.currencyRepository.findById(id, filter);
  }

  @patch('/currencies/{id}')
  @response(204, {
    description: 'Currency PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, { partial: true }),
        },
      },
    })
    currency: Currency,
  ): Promise<void> {
    await this.currencyRepository.updateById(id, currency);
  }

  @put('/currencies/{id}')
  @response(204, {
    description: 'Currency PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() currency: Currency,
  ): Promise<void> {
    await this.currencyRepository.replaceById(id, currency);
  }

  @del('/currencies/{id}')
  @response(204, {
    description: 'Currency DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.currencyRepository.deleteById(id);
  }
}
