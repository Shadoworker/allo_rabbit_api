import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class RestaurantValidationRequest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  status?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RestaurantValidationRequest>) {
    super(data);
  }
}

export interface RestaurantValidationRequestRelations {
  // describe navigational properties here
}

export type RestaurantValidationRequestWithRelations = RestaurantValidationRequest & RestaurantValidationRequestRelations;
