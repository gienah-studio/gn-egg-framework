import * as Egg from 'egg';
import { Redis } from 'ioredis';
import 'egg-sequelize';

type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass
  ? InstanceType<U>
  : U;

import ExportCoreCache = require('./app/service/core/cache');
import ExportCoreHttp = require('./app/service/core/http');
import ExportCoreShortId = require('./app/service/core/shortid');
import ExportCoreAccount = require('./app/service/core/account');
import ExportCoreMobile = require('./app/service/core/mobile');
import ExportCoreLog = require('./app/service/core/log');
declare module 'egg' {
  interface Application {
    redis: Redis;
  }
  interface IService {
    core: {
      cache: AutoInstanceType<typeof ExportCoreCache>;
      http: AutoInstanceType<typeof ExportCoreHttp>;
      shortid: AutoInstanceType<typeof ExportCoreShortId>;
      account: AutoInstanceType<typeof ExportCoreAccount>;
      mobile: AutoInstanceType<typeof ExportCoreMobile>;
      log: AutoInstanceType<typeof ExportCoreLog>;
    };
  }
}

export = Egg;
