import {Entity, model, property} from '@loopback/repository';

@model()
export class DelivererValidationRequest extends Entity {
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


  constructor(data?: Partial<DelivererValidationRequest>) {
    super(data);
  }
}

export interface DelivererValidationRequestRelations {
  // describe navigational properties here
}

export type DelivererValidationRequestWithRelations = DelivererValidationRequest & DelivererValidationRequestRelations;
