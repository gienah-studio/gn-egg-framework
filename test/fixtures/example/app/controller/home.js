'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const data = await this.service.core.shortid.generate();
    this.ctx.body = data;
  }
}

module.exports = HomeController;
