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
    const { service } = this;

    try {
      const res = await service.core.http.get(`http://${process.env.ACCOUNT_SVC_HOST}/user/role`, { userId });
      return _.get(res, 'data.data.role', 0);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
}

module.exports = AccountService;
