import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Sos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
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