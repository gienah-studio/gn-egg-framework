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
  alinode: {
    enable: process.env.NODE_ENV === 'production',
    package: 'egg-alinode',
  },
};

module.exports = exports = plugin;
