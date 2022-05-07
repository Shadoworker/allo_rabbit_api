import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

const config = {
  name: 'mysqlDatasource',
  connector: 'mysql',
  url: 'mysql://root:root@127.0.0.1/allo_rabbit_db',
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'allo_rabbit_db'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqlDatasourceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mysqlDatasource';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysqlDatasource', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
