import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
import { hostname } from 'os';


let env = process.env.NODE_ENV || "development";

function isDevelopmentMode() {
  return env === "development";
}

// function scanUrlForOnlineTesting() {
// console.log(process.env.NODE_ENV)
// }

// scanUrlForOnlineTesting();

const configDev = {
  name: 'mysqlDatasource',
  connector: 'mysql',
  url: 'mysql://root:root@127.0.0.1/allo_rabbit_db',
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'allo_rabbit_db'
};

const configProd = {
  name: 'mysqlDatasource',
  connector: 'mysql',
  url: 'mysql://ula0ylvdnpcrh2xb:ZLotrWFtWhYd1f5uHyMs@bz5o4ncdepwymfxwnxbb-mysql.services.clever-cloud.com:3306/bz5o4ncdepwymfxwnxbb',
  host: 'bz5o4ncdepwymfxwnxbb-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'ula0ylvdnpcrh2xb',
  password: 'ZLotrWFtWhYd1f5uHyMs',
  database: 'bz5o4ncdepwymfxwnxbb'
};


let config = isDevelopmentMode() ? configDev : configProd;

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
