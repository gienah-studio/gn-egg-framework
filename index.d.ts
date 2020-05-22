import * as Egg from 'egg';
import { Application } from 'egg';
import { Redis } from 'ioredis';

declare module 'egg' {
  interface Application {
    redis: Redis;
  }
}

export = Egg;
