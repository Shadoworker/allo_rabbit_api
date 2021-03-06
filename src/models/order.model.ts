import { Entity, model, property, belongsTo, hasOne } from '@loopback/repository';
import { ArUser } from './ar-user.model';
import { Restaurant } from './restaurant.model';
import { Currency } from './currency.model';
import { Deliverer } from './deliverer.model';

@model({ settings: { strict: true } })
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
    default: 'Commande'
  })
  name?: string;

  @property({
    type: 'string',
    default: 'default'
  })
  image?: string;

  @property({
    type: 'number',
    generated: true,
  })
  orderId?: number;

  @property({
    type: 'number',
  })
  amount?: number;

  @property({
    type: 'number',
    default: 0,
  })
  deliveryCharges?: number;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @property({
    type: 'object',
  })
  geolocation?: object;

  @belongsTo(() => ArUser)
  arUserId: string;

  @belongsTo(() => Restaurant)
  restaurantId: string;

  @hasOne(() => Currency)
  currency: Currency;

  @hasOne(() => Deliverer)
  deliverer: Deliverer;

  @property({
    type: 'string',
  })
  delivererId?: string;
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
