import { Entity, model, property, belongsTo, hasMany } from '@loopback/repository';
import { ArUser } from './ar-user.model';
import { Order } from './order.model';

@model({ settings: { strict: true } })
export class Deliverer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'boolean',
  })
  isApproved?: boolean;

  @property({
    type: 'boolean',
  })
  isAvailable?: boolean;

  @property({
    type: 'object',
  })
  geolocation?: object;

  @belongsTo(() => ArUser)
  arUserId: string;

  @property({
    type: 'string',
  })
  orderId?: string;

  @hasMany(() => Order)
  orders: Order[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Deliverer>) {
    super(data);
  }
}

export interface DelivererRelations {
  // describe navigational properties here
}

export type DelivererWithRelations = Deliverer & DelivererRelations;
