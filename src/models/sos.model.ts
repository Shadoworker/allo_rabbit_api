import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Deliverer } from './deliverer.model';

@model({ settings: { strict: false } })
export class Sos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  message?: string;

  @belongsTo(() => Deliverer)
  delivererId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Sos>) {
    super(data);
  }
}

export interface SosRelations {
  // describe navigational properties here
}

export type SosWithRelations = Sos & SosRelations;
