'use strict';

const { WECHAT_TOKEN } = process.env;

module.exports = {
  port: 8080,
  wechat: {
    token: WECHAT_TOKEN,
    url: '/wechat',
  },
};
