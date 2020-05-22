'use strict';

const Service = require('egg').Service;
const shortid = require('shortid');

class ShortIdService extends Service {
  getShortId({ count }) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(shortid.generate());
    }
    return data;
  }
}

module.exports = ShortIdService;
