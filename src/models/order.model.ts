import { Entity, model, property, belongsTo, hasOne } from '@loopback/repository';
import { ArUser } from './ar-user.model';
import { Restaurant } from './restaurant.model';
import { Currency } from './currency.model';

@model({ settings: { strict: false } })
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'number',
  })
  amount?: number;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @belongsTo(() => ArUser)
  arUserId: string;

  @belongsTo(() => Restaurant)
  restaurantId: string;

  @hasOne(() => Currency)
  currency: Currency;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
