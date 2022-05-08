import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Deliverer } from './deliverer.model';

@model()
export class DelivererValidationRequest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @belongsTo(() => Deliverer)
  delivererId: string;

  constructor(data?: Partial<DelivererValidationRequest>) {
    super(data);
  }
}

export interface DelivererValidationRequestRelations {
  // describe navigational properties here
}

export type DelivererValidationRequestWithRelations = DelivererValidationRequest & DelivererValidationRequestRelations;
