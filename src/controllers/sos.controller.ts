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
import {Sos} from '../models';
import {SosRepository} from '../repositories';

export class SosController {
  constructor(
    @repository(SosRepository)
    public sosRepository : SosRepository,
  ) {}

  @post('/sos')
  @response(200, {
    description: 'Sos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sos, {
            title: 'NewSos',
            exclude: ['id'],
          }),
        },
      },
    })
    sos: Omit<Sos, 'id'>,
  ): Promise<Sos> {
    return this.sosRepository.create(sos);
  }

  @get('/sos/count')
  @response(200, {
    description: 'Sos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sos) where?: Where<Sos>,
  ): Promise<Count> {
    return this.sosRepository.count(where);
  }

  @get('/sos')
  @response(200, {
    description: 'Array of Sos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sos) filter?: Filter<Sos>,
  ): Promise<Sos[]> {
    return this.sosRepository.find(filter);
  }

  @patch('/sos')
  @response(200, {
    description: 'Sos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sos, {partial: true}),
        },
      },
    })
    sos: Sos,
    @param.where(Sos) where?: Where<Sos>,
  ): Promise<Count> {
    return this.sosRepository.updateAll(sos, where);
  }

  @get('/sos/{id}')
  @response(200, {
    description: 'Sos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Sos, {exclude: 'where'}) filter?: FilterExcludingWhere<Sos>
  ): Promise<Sos> {
    return this.sosRepository.findById(id, filter);
  }

  @patch('/sos/{id}')
  @response(204, {
    description: 'Sos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sos, {partial: true}),
        },
      },
    })
    sos: Sos,
  ): Promise<void> {
    await this.sosRepository.updateById(id, sos);
  }

  @put('/sos/{id}')
  @response(204, {
    description: 'Sos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sos: Sos,
  ): Promise<void> {
    await this.sosRepository.replaceById(id, sos);
  }

  @del('/sos/{id}')
  @response(204, {
    description: 'Sos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sosRepository.deleteById(id);
  }
}
