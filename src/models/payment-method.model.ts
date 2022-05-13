import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: true } })
export class PaymentMethod extends Entity {
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
  prop?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PaymentMethod>) {
    super(data);
  }
}

export interface PaymentMethodRelations {
  // describe navigational properties here
}

export type PaymentMethodWithRelations = PaymentMethod & PaymentMethodRelations;
