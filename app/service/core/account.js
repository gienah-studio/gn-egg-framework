'use strict';

const { Service } = require('egg');
const { GN_ERROR_CODE, default: GNError } = require('gn-egg-lib/gn-error');
const _ = require('lodash');

class AccountService extends Service {
  /**
   * Get user role
   * @param {string} userId the id of the user
   */
  async getRole(userId) {
    const { app, service } = this;
    const accountServiceHost = app.config.endpoint.accountService;
    if (!accountServiceHost) {
      console.warn('ACCOUNT_SVC_HOST not provided, skip logging');
      return;
    }

    try {
      const res = await service.core.http.get(`http://${accountServiceHost}/user/role`, { userId });
      return _.get(res, 'data.data.role', 0);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
}

module.exports = AccountService;
