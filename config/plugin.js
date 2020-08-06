'use strict';

const plugin = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
  alinode: {
    enable: process.env.NODE_ENV === 'production',
    package: 'egg-alinode',
  },
};

module.exports = exports = plugin;
