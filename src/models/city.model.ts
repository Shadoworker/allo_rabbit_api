import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Country } from './country.model';

@model({ settings: { strict: false } })
export class City extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @belongsTo(() => Country)
  countryId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<City>) {
    super(data);
  }
}

export interface CityRelations {
  // describe navigational properties here
}

export type CityWithRelations = City & CityRelations;
