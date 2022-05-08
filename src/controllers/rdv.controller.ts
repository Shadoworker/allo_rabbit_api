import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Rdv} from '../models';
import {RdvRepository} from '../repositories';

export class RdvController {
  constructor(
    @repository(RdvRepository)
    public rdvRepository : RdvRepository,
  ) {}

  @post('/rdvs')
  @response(200, {
    description: 'Rdv model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rdv)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rdv, {
            title: 'NewRdv',
            exclude: ['id'],
          }),
        },
      },
    })
    rdv: Omit<Rdv, 'id'>,
  ): Promise<Rdv> {
    return this.rdvRepository.create(rdv);
  }

  @get('/rdvs/count')
  @response(200, {
    description: 'Rdv model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Rdv) where?: Where<Rdv>,
  ): Promise<Count> {
    return this.rdvRepository.count(where);
  }

  @get('/rdvs')
  @response(200, {
    description: 'Array of Rdv model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rdv, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rdv) filter?: Filter<Rdv>,
  ): Promise<Rdv[]> {
    return this.rdvRepository.find(filter);
  }

  @patch('/rdvs')
  @response(200, {
    description: 'Rdv PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rdv, {partial: true}),
        },
      },
    })
    rdv: Rdv,
    @param.where(Rdv) where?: Where<Rdv>,
  ): Promise<Count> {
    return this.rdvRepository.updateAll(rdv, where);
  }

  @get('/rdvs/{id}')
  @response(200, {
    description: 'Rdv model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rdv, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Rdv, {exclude: 'where'}) filter?: FilterExcludingWhere<Rdv>
  ): Promise<Rdv> {
    return this.rdvRepository.findById(id, filter);
  }

  @patch('/rdvs/{id}')
  @response(204, {
    description: 'Rdv PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rdv, {partial: true}),
        },
      },
    })
    rdv: Rdv,
  ): Promise<void> {
    await this.rdvRepository.updateById(id, rdv);
  }

  @put('/rdvs/{id}')
  @response(204, {
    description: 'Rdv PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() rdv: Rdv,
  ): Promise<void> {
    await this.rdvRepository.replaceById(id, rdv);
  }

  @del('/rdvs/{id}')
  @response(204, {
    description: 'Rdv DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rdvRepository.deleteById(id);
  }
}
