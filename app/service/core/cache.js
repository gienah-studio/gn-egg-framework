'use strict';

const { Service } = require('egg');
const { GN_ERROR_CODE, default: GNError } = require('gn-egg-lib/gn-error');
const _ = require('lodash');

class CacheService extends Service {
  /**
   * Set cache item
   * @param {string} key cache key
   * @param {any} value cache value, prefer object
   * @param {number | undefined} milliseconds time expire in milliseconds
   */
  async set(key, value, milliseconds) {
    const { app, logger } = this;
    const { redis } = app;

    value = JSON.stringify(value);
    logger.debug(`[CACHE] SET ${key} in ${milliseconds || 'infinity'}`);

    try {
      if (!milliseconds) {
        return redis.set(key, value);
      }
      const randomValue = Math.floor(Math.random() * 10000);
      return redis.set(key, value, 'PX', milliseconds - randomValue);
    } catch (e) {
      throw new GNError(GN_ERROR_CODE.CACHE_ERROR, {
        e,
        key,
        value,
        milliseconds,
      });
    }
  }

  /**
   * Get cache item
   * @param {string} key cache key
   */
  async get(key) {
    const { app, logger } = this;
    const { redis } = app;
    logger.debug(`[CACHE] GET ${key}`);
    let data;
    try {
      data = await redis.get(key);
    } catch (e) {
      throw new GNError(GN_ERROR_CODE.CACHE_ERROR, { e, key });
    }

    if (!data) return null;
    try {
      data = JSON.parse(data);
      return data;
    } catch (e) {
      return data;
    }
  }

  /**
   * Delete cache item
   * @param {string} key cache key
   */
  async del(key) {
    const { app, logger } = this;
    const { redis } = app;
    logger.debug(`[CACHE] DEL ${key}`);
    try {
      return redis.del(key);
    } catch (e) {
      throw new GNError(GN_ERROR_CODE.CACHE_ERROR, { key, e });
    }
  }

  async lrem(key, count, value) {
    const { app, logger } = this;
    const { redis } = app;
    logger.debug(`[CACHE] LREM ${key} ${count} ${value}`);
    try {
      return redis.lrem(key, count, value);
    } catch (e) {
      throw new GNError(GN_ERROR_CODE.CACHE_ERROR, {
        count,
        value,
        e,
      });
    }
  }

  async rpush(key, arrayData) {
    if (!(_.isString(arrayData) || _.isArray(arrayData))) return;
    if (_.isArray(arrayData) && arrayData.length === 0) return;

    const { app, logger } = this;
    const { redis } = app;

    try {
      logger.debug(`[CACHE] rpush ${key} ${arrayData}`);
      if (_.isArray(arrayData)) {
        return redis.rpush(key, ...arrayData);
      }
      return redis.rpush(key, arrayData);
    } catch (e) {
      throw new GNError(GN_ERROR_CODE.CACHE_ERROR, {
        key,
        arrayData,
        e,
      });
    }
  }

  async lrange(key, start, end) {
    const { app } = this;
    const { redis } = app;
    try {
      return redis.lrange(key, start, end);
    } catch (e) {
      throw new GNError(GN_ERROR_CODE.CACHE_ERROR, {
        key,
        start,
        end,
        e,
      });
    }
  }

  async getList(key) {
    try {
      return this.lrange(key, 0, -1);
    } catch (e) {
      throw new GNError(GN_ERROR_CODE.CACHE_ERROR, { key, e });
    }
  }

  async pub(channel, message) {
    const { app, logger } = this;
    const { redis } = app;
    logger.debug(`[CACHE] PUB ${message} to ${channel}`);
    try {
      return redis.publish(channel, JSON.stringify(message));
    } catch (e) {
      throw new GNError(GN_ERROR_CODE.CACHE_ERROR, {
        e,
        channel,
        message,
      });
    }
  }
}

module.exports = CacheService;
