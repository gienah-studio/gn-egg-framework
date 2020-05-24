'use strict';

const { Service } = require('egg');
const { GN_ERROR_CODE, default: GNError } = require('gn-egg-lib/gn-error');
const _ = require('lodash');

class MobileService extends Service {
  /**
   * Send random captcha to mobile
   * @param {string} mobile mobile number
   * @param {string} sceneCode mobile scene code
   */
  async sendCaptcha(mobile, sceneCode) {
    const { service } = this;

    try {
      const res = await service.core.http.post(`http://${process.env.MOBILE_SVC_HOST}/captcha/send`, { mobile, sceneCode });
      return res;
    } catch (e) {
      throw new GNError(GN_ERROR_CODE.MOBILE_CAPTCHA_SENT_ERROR, e);
    }
  }
}

module.exports = MobileService;
