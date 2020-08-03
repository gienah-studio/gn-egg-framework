'use strict';

const { Service } = require('egg');
const { GN_ERROR_CODE, default: GNError } = require('gn-egg-lib/gn-error');

class HttpService extends Service {
  /**
   * Call http get method
   * @param {string} url url to get
   * @param {object} params get params
   * @param {object} options httpClient options
   */
  async get(url, params, options) {
    const { ctx } = this;
    try {
      return await ctx.curl(url, {
        data: params,
        dataType: 'json',
        ...options,
      });
    } catch (e) {
      throw new GNError(GN_ERROR_CODE.HTTP_GET_ERROR, {
        e,
        url,
        params,
      });
    }
  }

  /**
   * Call http post method
   * @param {string} url url to post
   * @param {object} params post params
   * @param {object} options httpClient options
   */
  async post(url, params, options) {
    const { ctx } = this;
    try {
      return await ctx.curl(url, {
        data: params,
        contentType: 'json',
        method: 'POST',
        dataType: 'json',
        ...options,
      });
    } catch (e) {
      throw new GNError(GN_ERROR_CODE.HTTP_POST_ERROR, {
        e,
        url,
        params,
      });
    }
  }
}

module.exports = HttpService;
