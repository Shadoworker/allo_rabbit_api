import { Entity, model, property, hasMany } from '@loopback/repository';
import { ArUser } from './ar-user.model';

@model()
export class Roles extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  // @hasMany(() => ArUser)
  // arUsers: ArUser[];

  // @property({
  //   type: 'string',
  // })
  // arUserId?: string;
  // @property({
  //   type: 'string',
  // })
  // arUserId?: string;

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
