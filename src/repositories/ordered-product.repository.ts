import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {OrderedProduct, OrderedProductRelations} from '../models';

export class OrderedProductRepository extends DefaultCrudRepository<
  OrderedProduct,
  typeof OrderedProduct.prototype.id,
  OrderedProductRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(OrderedProduct, dataSource);
  }
}
