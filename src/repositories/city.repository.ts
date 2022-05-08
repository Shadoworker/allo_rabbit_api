import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {City, CityRelations, Country} from '../models';
import {CountryRepository} from './country.repository';

export class CityRepository extends DefaultCrudRepository<
  City,
  typeof City.prototype.id,
  CityRelations
> {

  public readonly country: BelongsToAccessor<Country, typeof City.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>,
  ) {
    super(City, dataSource);
    this.country = this.createBelongsToAccessorFor('country', countryRepositoryGetter,);
    this.registerInclusionResolver('country', this.country.inclusionResolver);
  }
}
