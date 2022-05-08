import { inject, Getter} from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import { MysqlDatasourceDataSource } from '../datasources';
import { Rdv, RdvRelations, ArUser} from '../models';
import {ArUserRepository} from './ar-user.repository';

export class RdvRepository extends DefaultCrudRepository<
  Rdv,
  typeof Rdv.prototype.id,
  RdvRelations
> {

  public readonly arUser: BelongsToAccessor<ArUser, typeof Rdv.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('ArUserRepository') protected arUserRepositoryGetter: Getter<ArUserRepository>,
  ) {
    super(Rdv, dataSource);
    this.arUser = this.createBelongsToAccessorFor('arUser', arUserRepositoryGetter,);
    this.registerInclusionResolver('arUser', this.arUser.inclusionResolver);
  }
}
