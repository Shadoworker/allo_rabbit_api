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
  ProductCategory,
} from '../models';
import {ArUserRepository} from '../repositories';

export class ArUserProductCategoryController {
  constructor(
    @repository(ArUserRepository) protected arUserRepository: ArUserRepository,
  ) { }

  @get('/ar-users/{id}/product-categories', {
    responses: {
      '200': {
        description: 'Array of ArUser has many ProductCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductCategory)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProductCategory>,
  ): Promise<ProductCategory[]> {
    return this.arUserRepository.productCategories(id).find(filter);
  }

  @post('/ar-users/{id}/product-categories', {
    responses: {
      '200': {
        description: 'ArUser model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductCategory)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ArUser.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductCategory, {
            title: 'NewProductCategoryInArUser',
            exclude: ['id'],
            optional: ['arUserId']
          }),
        },
      },
    }) productCategory: Omit<ProductCategory, 'id'>,
  ): Promise<ProductCategory> {
    return this.arUserRepository.productCategories(id).create(productCategory);
  }

  @patch('/ar-users/{id}/product-categories', {
    responses: {
      '200': {
        description: 'ArUser.ProductCategory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductCategory, {partial: true}),
        },
      },
    })
    productCategory: Partial<ProductCategory>,
    @param.query.object('where', getWhereSchemaFor(ProductCategory)) where?: Where<ProductCategory>,
  ): Promise<Count> {
    return this.arUserRepository.productCategories(id).patch(productCategory, where);
  }

  @del('/ar-users/{id}/product-categories', {
    responses: {
      '200': {
        description: 'ArUser.ProductCategory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductCategory)) where?: Where<ProductCategory>,
  ): Promise<Count> {
    return this.arUserRepository.productCategories(id).delete(where);
  }
}
