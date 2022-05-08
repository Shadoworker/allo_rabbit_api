import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class RestaurantCategory extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  restaurantId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RestaurantCategory>) {
    super(data);
  }
}

export interface RestaurantCategoryRelations {
  // describe navigational properties here
}

export type RestaurantCategoryWithRelations = RestaurantCategory & RestaurantCategoryRelations;
