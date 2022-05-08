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
  Product,
  ProductCategory,
} from '../models';
import { ProductRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class ProductProductCategoryController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/product-category', {
    responses: {
      '200': {
        description: 'Product has one ProductCategory',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProductCategory),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProductCategory>,
  ): Promise<ProductCategory> {
    return this.productRepository.productCategory(id).get(filter);
  }

  @post('/products/{id}/product-category', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: getModelSchemaRef(ProductCategory) } },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductCategory, {
            title: 'NewProductCategoryInProduct',
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) productCategory: Omit<ProductCategory, 'id'>,
  ): Promise<ProductCategory> {
    return this.productRepository.productCategory(id).create(productCategory);
  }

  @patch('/products/{id}/product-category', {
    responses: {
      '200': {
        description: 'Product.ProductCategory PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductCategory, { partial: true }),
        },
      },
    })
    productCategory: Partial<ProductCategory>,
    @param.query.object('where', getWhereSchemaFor(ProductCategory)) where?: Where<ProductCategory>,
  ): Promise<Count> {
    return this.productRepository.productCategory(id).patch(productCategory, where);
  }

  @del('/products/{id}/product-category', {
    responses: {
      '200': {
        description: 'Product.ProductCategory DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductCategory)) where?: Where<ProductCategory>,
  ): Promise<Count> {
    return this.productRepository.productCategory(id).delete(where);
  }
}
