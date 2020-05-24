'use strict';

const Service = require('egg').Service;
const shortid = require('shortid');
const _ = require('lodash');

class ShortIdService extends Service {
  /**
   * Generate random shortId
   * @param {number} count number of shortIds you want to generate
   */
  generate(count = 1) {
    if (!_.isNumber(count)) { return null; }

    if (count === 0) return null;
    if (count === 1) return shortid.generate();

    const data = [];
    for (let i = 0; i < count; i += 1) {
      data.push(shortid.generate());
    }
    return data;
  }
}

module.exports = ShortIdService;
