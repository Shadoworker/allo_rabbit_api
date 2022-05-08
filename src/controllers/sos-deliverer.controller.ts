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
  Sos,
  Deliverer,
} from '../models';
import { SosRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

@authenticate('jwt')
export class SosDelivererController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile,

    @repository(SosRepository)
    public sosRepository: SosRepository,
  ) { }

  @get('/sos/{id}/deliverer', {
    responses: {
      '200': {
        description: 'Deliverer belonging to Sos',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Deliverer) },
          },
        },
      },
    },
  })
  async getDeliverer(
    @param.path.string('id') id: typeof Sos.prototype.id,
  ): Promise<Deliverer> {
    return this.sosRepository.deliverer(id);
  }
}
