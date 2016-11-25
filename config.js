'use strict';

const { WECHAT_TOKEN } = process.env;

module.exports = {
  esp: {
    port: 13131,
  },
  wechat: {
    token: WECHAT_TOKEN,
    url: '/wechat',
    port: 8080,
  },
};
