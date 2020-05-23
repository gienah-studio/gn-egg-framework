import * as Egg from 'egg';
import { Application } from 'egg';
import { Redis } from 'ioredis';

type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;

import ExportCoreCache from './app/service/core/cache';
import ExportCoreHttp from './app/service/core/http';
import ExportCoreShortId from './app/service/core/wechat';

declare module 'egg' {
  interface Application {
    redis: Redis;
  }
  interface IService {
    core: {
      cache: AutoInstanceType<typeof ExportCoreCache>;
      http: AutoInstanceType<typeof ExportCoreHttp>;
      shortid: AutoInstanceType<typeof ExportCoreShortId>;
    }
  }
}

export = Egg;
