import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {DelivererValidationRequest, DelivererValidationRequestRelations, Deliverer} from '../models';
import {DelivererRepository} from './deliverer.repository';

export class DelivererValidationRequestRepository extends DefaultCrudRepository<
  DelivererValidationRequest,
  typeof DelivererValidationRequest.prototype.id,
  DelivererValidationRequestRelations
> {

  public readonly deliverer: BelongsToAccessor<Deliverer, typeof DelivererValidationRequest.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('DelivererRepository') protected delivererRepositoryGetter: Getter<DelivererRepository>,
  ) {
    super(DelivererValidationRequest, dataSource);
    this.deliverer = this.createBelongsToAccessorFor('deliverer', delivererRepositoryGetter,);
    this.registerInclusionResolver('deliverer', this.deliverer.inclusionResolver);
  }
}
