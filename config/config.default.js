'use strict';

module.exports = appInfo => {
  const config = {};

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    },
  };

  config.endpoint = {
    accountService: process.env.ACCOUNT_SVC_HOST,
    logService: process.env.LOG_SVC_HOST,
  };

  config.sequelize = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    define: {
      freezeTableName: true,
      underscored: false,
      paranoid: true,
      timestamps: true,
    },
    timezone: '+08:00',
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.logger = {
    outputJSON: process.env.NODE_ENV === 'production',
  };

  config.redis = {
    client: {
      host: process.env.CACHE_HOST,
      port: parseInt(process.env.CACHE_PORT) || 6379,
      password: process.env.CACHE_PASSWORD,
      db: parseInt(process.env.CACHE_DB) || 0,
    },
    agent: true,
  };

  config.alinode = {
    appid: process.env.ALINODE_APPID,
    secret: process.env.ALINODE_APP_SECRET,
  };

  config.httpclient = {
    enableDNSCache: true,
  };

  config.session = {
    key: process.env.SESSION_KEY || 'GN_SESS',
    renew: true,
    maxAge: parseInt(process.env.SESSION_MAX_AGE) || 3600000,
    httpOnly: true,
    encrypt: true,
  };

  return config;
};
