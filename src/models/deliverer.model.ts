import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Deliverer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
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
