'use strict';

const { GN_ERROR_CODE, default: GNError } = require('gn-egg-lib/gn-error');
const _ = require('lodash');

const logError = (err, ctx) => {
  ctx.logger.error(
    new GNError(GN_ERROR_CODE.INTERNAL_SERVER_ERROR, {
      stack: err.stack,
      code: err.code,
      data: err.data,
      message: err.message || (err.data && err.data.e && err.data.e.message),
      ctx,
    })
  );
};

function errorHandler() {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      const { code, data, message, stack } = err;
      const { config } = ctx.app;
      if (err instanceof GNError) {
        if (code > 0 && code < 10000) {
          logError(err, ctx);
        }
        ctx.status = 200;
        ctx.body = config.isProd
          ? {
            code,
          }
          : {
            code,
            message: message || (data && data.e && data.e.message),
            data,
            stack,
          };
      } else {
        logError(err, ctx);
        ctx.status = 500;
        ctx.body = config.isProd
          ? {
            error: message,
          }
          : {
            message: message || (data && data.e && data.e.message),
            err,
          };
      }
    }
  };
}

module.exports = errorHandler;
