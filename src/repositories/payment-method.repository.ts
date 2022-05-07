import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDatasourceDataSource} from '../datasources';
import {PaymentMethod, PaymentMethodRelations} from '../models';

export class PaymentMethodRepository extends DefaultCrudRepository<
  PaymentMethod,
  typeof PaymentMethod.prototype.id,
  PaymentMethodRelations
> {
  constructor(
    @inject('datasources.mysqlDatasource') dataSource: MysqlDatasourceDataSource,
  ) {
    super(PaymentMethod, dataSource);
  }
}
