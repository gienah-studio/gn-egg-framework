'use strict';

module.exports = appInfo => {
  const config = {};

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    },
  };

  config.sequelize = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
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
    outputJSON: false,
  };

  config.redis = {
    client: {
      host: process.env.CACHE_HOST,
      port: parseInt(process.env.CACHE_PORT),
      password: process.env.CACHE_PASSWORD,
      db: parseInt(process.env.CACHE_DB),
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

  return config;
};
