'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class LogService extends Service {
  async record(eventName, eventData) {
    const { app, service } = this;
    const logServiceHost = app.config.endpoint.logService;
    if (!logServiceHost) {
      console.warn('LOG_SVC_HOST not provided, skip logging');
      return;
    }

    try {
      return await service.core.http.post(`http://${logServiceHost}/record`, { eventName, eventData });
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
}

module.exports = LogService;
