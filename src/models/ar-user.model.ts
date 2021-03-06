// import {Entity, model, property} from '@loopback/repository';

// @model()
// export class ArUser extends Entity {

//   constructor(data?: Partial<ArUser>) {
//     super(data);
//   }
// }

// export interface ArUserRelations {
//   // describe navigational properties here
// }

// export type ArUserWithRelations = ArUser & ArUserRelations;


import { User } from '@loopback/authentication-jwt';
import { Entity, hasOne, model, property, hasMany } from '@loopback/repository';
import { ArUserCredentials } from './ar-user-credentials.model';
import { Roles } from './roles.model';
import { Restaurant } from './restaurant.model';
import {ProductCategory} from './product-category.model';
import {Order} from './order.model';

// import {Language} from './language.model';

@model({ settings: { strict: true } })
export class ArUser extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  phones?: string[];

  @property({
    type: 'string'
  })
  password: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
  })
  avatar?: string;

  @property({
    type: 'boolean',
  })
  isActivated?: boolean;

  @property({
    type: 'string',
  })
  activationCode?: string;

  @property({
    type: 'string',
  })
  resetPasswordCode?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  roles?: string[];

  @property({
    type: 'string',
  })
  pushToken?: string;

  @hasOne(() => ArUserCredentials)
  userCredentials: ArUserCredentials;

  @hasOne(() => ArUserCredentials)
  arUserCredentials: ArUserCredentials;

  @hasMany(() => Restaurant)
  restaurants: Restaurant[];

  @hasMany(() => ProductCategory)
  productCategories: ProductCategory[];

  @hasMany(() => Order, {through: {model: () => Restaurant}})
  orders: Order[];
  // @property({
  //   type: 'string',
  // })
  // rolesId?: string;

  // @hasMany(() => Roles)
  // roles: Roles[];
  // @hasMany(() => Roles)
  // roles: Roles[];
  // @hasOne(() => Language)
  // language: Language;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ArUser>) {
    super(data);
  }
}

export interface ArUserRelations {
  // describe navigational properties here
}

export type ArUserWithRelations = ArUser & ArUserRelations;
