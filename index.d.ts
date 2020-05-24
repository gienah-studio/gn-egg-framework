import * as Egg from 'egg';
import { Application } from 'egg';
import { Redis } from 'ioredis';

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
    };
  }
}

export = Egg;
