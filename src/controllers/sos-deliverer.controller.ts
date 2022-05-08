import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sos,
  Deliverer,
} from '../models';
import {SosRepository} from '../repositories';

export class SosDelivererController {
  constructor(
    @repository(SosRepository)
    public sosRepository: SosRepository,
  ) { }

  @get('/sos/{id}/deliverer', {
    responses: {
      '200': {
        description: 'Deliverer belonging to Sos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Deliverer)},
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
