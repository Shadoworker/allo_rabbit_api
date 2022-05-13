import { Entity, model, property, hasOne, belongsTo } from '@loopback/repository';
import { ProductCategory } from './product-category.model';
import {Restaurant} from './restaurant.model';

@model({settings: {strict: true}})
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'number',
  })
  price?: number;

  @property({
    type: 'number',
  })
  initialStock?: number;

  @property({
    type: 'number',
  })
  remainingStock?: number;

  @property({
    type: 'boolean',
  })
  availability?: boolean;

  @property({
    type: 'boolean',
  })
  onDiscount?: boolean;

  @property({
    type: 'number',
  })
  discount?: number;

  @property({
    type: 'boolean',
  })
  isValidated?: boolean;

  @property({
    type: 'string',
  })
  description?: string;

  @belongsTo(() => ProductCategory)
  productCategoryId: string;

  @belongsTo(() => Restaurant)
  restaurantId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
