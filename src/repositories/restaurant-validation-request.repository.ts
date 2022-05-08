import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {RestaurantValidationRequest, RestaurantValidationRequestRelations, Restaurant} from '../models';
import {RestaurantRepository} from './restaurant.repository';

export class RestaurantValidationRequestRepository extends DefaultCrudRepository<
  RestaurantValidationRequest,
  typeof RestaurantValidationRequest.prototype.id,
  RestaurantValidationRequestRelations
> {

  public readonly restaurant: BelongsToAccessor<Restaurant, typeof RestaurantValidationRequest.prototype.id>;

  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource, @repository.getter('RestaurantRepository') protected restaurantRepositoryGetter: Getter<RestaurantRepository>,
  ) {
    super(RestaurantValidationRequest, dataSource);
    this.restaurant = this.createBelongsToAccessorFor('restaurant', restaurantRepositoryGetter,);
    this.registerInclusionResolver('restaurant', this.restaurant.inclusionResolver);
  }
}
