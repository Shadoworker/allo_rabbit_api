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
  Product,
} from '../models';
import {OrderedProductRepository} from '../repositories';

export class OrderedProductProductController {
  constructor(
    @repository(OrderedProductRepository)
    public orderedProductRepository: OrderedProductRepository,
  ) { }

  @get('/ordered-products/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to OrderedProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof OrderedProduct.prototype.id,
  ): Promise<Product> {
    return this.orderedProductRepository.product(id);
  }
}
