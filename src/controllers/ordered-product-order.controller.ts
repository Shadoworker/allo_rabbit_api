import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrderedProduct,
  Order,
} from '../models';
import {OrderedProductRepository} from '../repositories';

export class OrderedProductOrderController {
  constructor(
    @repository(OrderedProductRepository)
    public orderedProductRepository: OrderedProductRepository,
  ) { }

  @get('/ordered-products/{id}/order', {
    responses: {
      '200': {
        description: 'Order belonging to OrderedProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async getOrder(
    @param.path.string('id') id: typeof OrderedProduct.prototype.id,
  ): Promise<Order> {
    return this.orderedProductRepository.order(id);
  }
}
