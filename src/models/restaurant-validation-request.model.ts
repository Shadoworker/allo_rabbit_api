import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Restaurant } from './restaurant.model';

@model({ settings: { strict: true } })
export class RestaurantValidationRequest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @belongsTo(() => Restaurant)
  restaurantId: string;
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
