import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Product,
  Restaurant,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductRestaurantController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/restaurant', {
    responses: {
      '200': {
        description: 'Restaurant belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Restaurant)},
          },
        },
      },
    },
  })
  async getRestaurant(
    @param.path.string('id') id: typeof Product.prototype.id,
  ): Promise<Restaurant> {
    return this.productRepository.restaurant(id);
  }
}
