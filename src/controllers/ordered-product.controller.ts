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
import {OrderedProduct} from '../models';
import {OrderedProductRepository} from '../repositories';

export class OrderedProductController {
  constructor(
    @repository(OrderedProductRepository)
    public orderedProductRepository : OrderedProductRepository,
  ) {}

  @post('/ordered-products')
  @response(200, {
    description: 'OrderedProduct model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderedProduct)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderedProduct, {
            title: 'NewOrderedProduct',
            exclude: ['id'],
          }),
        },
      },
    })
    orderedProduct: Omit<OrderedProduct, 'id'>,
  ): Promise<OrderedProduct> {
    return this.orderedProductRepository.create(orderedProduct);
  }

  @get('/ordered-products/count')
  @response(200, {
    description: 'OrderedProduct model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderedProduct) where?: Where<OrderedProduct>,
  ): Promise<Count> {
    return this.orderedProductRepository.count(where);
  }

  @get('/ordered-products')
  @response(200, {
    description: 'Array of OrderedProduct model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderedProduct, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderedProduct) filter?: Filter<OrderedProduct>,
  ): Promise<OrderedProduct[]> {
    return this.orderedProductRepository.find(filter);
  }

  @patch('/ordered-products')
  @response(200, {
    description: 'OrderedProduct PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderedProduct, {partial: true}),
        },
      },
    })
    orderedProduct: OrderedProduct,
    @param.where(OrderedProduct) where?: Where<OrderedProduct>,
  ): Promise<Count> {
    return this.orderedProductRepository.updateAll(orderedProduct, where);
  }

  @get('/ordered-products/{id}')
  @response(200, {
    description: 'OrderedProduct model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderedProduct, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrderedProduct, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderedProduct>
  ): Promise<OrderedProduct> {
    return this.orderedProductRepository.findById(id, filter);
  }

  @patch('/ordered-products/{id}')
  @response(204, {
    description: 'OrderedProduct PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderedProduct, {partial: true}),
        },
      },
    })
    orderedProduct: OrderedProduct,
  ): Promise<void> {
    await this.orderedProductRepository.updateById(id, orderedProduct);
  }

  @put('/ordered-products/{id}')
  @response(204, {
    description: 'OrderedProduct PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderedProduct: OrderedProduct,
  ): Promise<void> {
    await this.orderedProductRepository.replaceById(id, orderedProduct);
  }

  @del('/ordered-products/{id}')
  @response(204, {
    description: 'OrderedProduct DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderedProductRepository.deleteById(id);
  }
}
