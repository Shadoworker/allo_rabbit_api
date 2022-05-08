import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {Sos, SosRelations, Deliverer} from '../models';
import {DelivererRepository} from './deliverer.repository';

export class SosRepository extends DefaultCrudRepository<
  Sos,
  typeof Sos.prototype.id,
  SosRelations
> {

  public readonly deliverer: BelongsToAccessor<Deliverer, typeof Sos.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('DelivererRepository') protected delivererRepositoryGetter: Getter<DelivererRepository>,
  ) {
    super(Sos, dataSource);
    this.deliverer = this.createBelongsToAccessorFor('deliverer', delivererRepositoryGetter,);
    this.registerInclusionResolver('deliverer', this.deliverer.inclusionResolver);
  }
}
