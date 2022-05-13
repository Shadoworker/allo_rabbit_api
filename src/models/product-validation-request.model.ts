import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Product } from './product.model';

@model({ settings: { strict: true } })
export class ProductValidationRequest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @belongsTo(() => Product)
  productId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProductValidationRequest>) {
    super(data);
  }
}

export interface ProductValidationRequestRelations {
  // describe navigational properties here
}

export type ProductValidationRequestWithRelations = ProductValidationRequest & ProductValidationRequestRelations;
