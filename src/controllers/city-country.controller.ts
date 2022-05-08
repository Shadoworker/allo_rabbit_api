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
  City,
  Country,
} from '../models';
import { CityRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';

// @authenticate('jwt')
export class CityCountryController {
  constructor(
    // @inject(SecurityBindings.USER) private user: UserProfile,

    @repository(CityRepository)
    public cityRepository: CityRepository,
  ) { }

  @get('/cities/{id}/country', {
    responses: {
      '200': {
        description: 'Country belonging to City',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Country) },
          },
        },
      },
    },
  })
  async getCountry(
    @param.path.string('id') id: typeof City.prototype.id,
  ): Promise<Country> {
    return this.cityRepository.country(id);
  }
}
