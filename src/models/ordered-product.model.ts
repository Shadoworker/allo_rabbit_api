import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Order} from './order.model';
import {Product} from './product.model';

@model({settings: {strict: false}})
export class OrderedProduct extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @belongsTo(() => Order)
  orderId: string;

  @belongsTo(() => Product)
  productId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<OrderedProduct>) {
    super(data);
  }
}

export interface OrderedProductRelations {
  // describe navigational properties here
}

export type OrderedProductWithRelations = OrderedProduct & OrderedProductRelations;
