import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductCategory,
  ArUser,
} from '../models';
import {ProductCategoryRepository} from '../repositories';

export class ProductCategoryArUserController {
  constructor(
    @repository(ProductCategoryRepository)
    public productCategoryRepository: ProductCategoryRepository,
  ) { }

  @get('/product-categories/{id}/ar-user', {
    responses: {
      '200': {
        description: 'ArUser belonging to ProductCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ArUser)},
          },
        },
      },
    },
  })
  async getArUser(
    @param.path.string('id') id: typeof ProductCategory.prototype.id,
  ): Promise<ArUser> {
    return this.productCategoryRepository.arUser(id);
  }
}
