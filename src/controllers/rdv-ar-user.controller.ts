import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Rdv,
  ArUser,
} from '../models';
import {RdvRepository} from '../repositories';

export class RdvArUserController {
  constructor(
    @repository(RdvRepository)
    public rdvRepository: RdvRepository,
  ) { }

  @get('/rdvs/{id}/ar-user', {
    responses: {
      '200': {
        description: 'ArUser belonging to Rdv',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ArUser)},
          },
        },
      },
    },
  })
  async getArUser(
    @param.path.string('id') id: typeof Rdv.prototype.id,
  ): Promise<ArUser> {
    return this.rdvRepository.arUser(id);
  }
}
