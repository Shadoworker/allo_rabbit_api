import { Entity, model, property, belongsTo } from '@loopback/repository';
import { ArUser } from './ar-user.model';

@model({ settings: { strict: false } })
export class Rdv extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'date',
  })
  date?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @belongsTo(() => ArUser)
  arUserId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Rdv>) {
    super(data);
  }
}

export interface RdvRelations {
  // describe navigational properties here
}

export type RdvWithRelations = Rdv & RdvRelations;
