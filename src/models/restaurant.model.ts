import { Entity, model, property, hasOne, belongsTo, hasMany} from '@loopback/repository';
import { RestaurantCategory } from './restaurant-category.model';
import { ArUser } from './ar-user.model';
import {Product} from './product.model';

@model({ settings: { strict: true } })
export class Restaurant extends Entity {
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

  @belongsTo(() => ArUser)
  arUserId: string;

  @hasMany(() => Product)
  products: Product[];
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
