'use strict';

const moment = require('moment');
const Wechat = require('nodejs-wechat');

const esp = require('./esp');
const config = require('./config');

const { wechat: { token, url } } = config;
const wechat = new Wechat({ token, url });

wechat.on('text', session => {
  const msg = session.incomingMessage.Content;
  console.log(`[wechat] receive message: ${msg}`);

  const recentRecord = esp.records.slice(-1)[0];
  if (!recentRecord) {
    session.replyTextMessage("no records");
  } else {
    const { timestamp, temperature, humidity } = recentRecord;
    const date = moment(timestamp).utcOffset("+08:00").format("YYYY-MM-DD HH:mm:ss");

    session.replyTextMessage(`Date: ${date}

Temperature(C): ${temperature}
Humidity(%RH):  ${humidity}`);
  }
});

module.exports = wechat;
