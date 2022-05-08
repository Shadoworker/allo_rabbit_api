import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {Deliverer, DelivererRelations, ArUser} from '../models';
import {ArUserRepository} from './ar-user.repository';

export class DelivererRepository extends DefaultCrudRepository<
  Deliverer,
  typeof Deliverer.prototype.id,
  DelivererRelations
> {

  public readonly arUser: BelongsToAccessor<ArUser, typeof Deliverer.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('ArUserRepository') protected arUserRepositoryGetter: Getter<ArUserRepository>,
  ) {
    super(Deliverer, dataSource);
    this.arUser = this.createBelongsToAccessorFor('arUser', arUserRepositoryGetter,);
    this.registerInclusionResolver('arUser', this.arUser.inclusionResolver);
  }
}
