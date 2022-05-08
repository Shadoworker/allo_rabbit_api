import {Entity, model, property, hasOne} from '@loopback/repository';
import {RestaurantCategory} from './restaurant-category.model';

@model({settings: {strict: false}})
export class Restaurant extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'object',
  })
  geolocation?: object;

  @property({
    type: 'string',
  })
  avatar?: string;

  @property({
    type: 'boolean',
  })
  available?: boolean;

  @property({
    type: 'boolean',
  })
  isValidated?: boolean;

  @hasOne(() => RestaurantCategory)
  restaurantCategory: RestaurantCategory;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Restaurant>) {
    super(data);
  }
}

export interface RestaurantRelations {
  // describe navigational properties here
}

export type RestaurantWithRelations = Restaurant & RestaurantRelations;
