'use strict';

const Wechat = require('nodejs-wechat');

const config = require('./config');

const wechat = new Wechat(config.wechat);

wechat.on('text', session => {
  console.log(session.incommingMessage.Content);
  session.replyTextMessage("...");
});

module.exports = wechat;
