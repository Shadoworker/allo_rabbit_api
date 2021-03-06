import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import { SecurityBindings, UserProfile } from '../loopauth/security/src';

import {
  DelivererValidationRequest,
  Deliverer,
} from '../models';
import { DelivererValidationRequestRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class DelivererValidationRequestDelivererController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(DelivererValidationRequestRepository)
    public delivererValidationRequestRepository: DelivererValidationRequestRepository,
  ) { }

  @get('/deliverer-validation-requests/{id}/deliverer', {
    responses: {
      '200': {
        description: 'Deliverer belonging to DelivererValidationRequest',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Deliverer) },
          },
        },
      },
    },
  })
  async getDeliverer(
    @param.path.string('id') id: typeof DelivererValidationRequest.prototype.id,
  ): Promise<Deliverer> {
    return this.delivererValidationRequestRepository.deliverer(id);
  }
}
