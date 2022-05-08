import { Entity, model, property, belongsTo } from '@loopback/repository';
import { ArUser } from './ar-user.model';

@model({ settings: { strict: false } })
export class Deliverer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
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

  @belongsTo(() => ArUser)
  arUserId: string;
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
