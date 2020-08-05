'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class LogService extends Service {
  async record(eventName, eventData) {
    const { app, service, ctx } = this;
    const logServiceHost = app.config.endpoint.logService;
    if (!logServiceHost) {
      console.warn('LOG_SVC_HOST not provided, skip logging');
      return;
    }

    const operatorId = _.get(ctx, 'session.user.userId');
    const operatorName = _.get(ctx, 'session.user.realName');
    if (!operatorId || !operatorName) {
      console.warn('operator not valid, skip: ', 'operatorId:', operatorId, 'operatorName: ', operatorName);
      return;
    }

    try {
      return await service.core.http.post(`http://${logServiceHost}/record`, {
        eventName,
        eventData,
        operatorId,
        operatorName,
      });
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
}

module.exports = LogService;
