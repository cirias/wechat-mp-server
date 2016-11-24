'use strict';

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const xmlparser = require('express-xml-parser');

const wechat = require('./wechat');
const config = require('./config');

const { port, wechat: { url } } = config;

const app = express();

app.use(morgan('combined'));

app.use(url, xmlparser({
  type: 'text/xml',
}));

app.get(url, wechat.verifyRequest.bind(wechat));
app.post(url, wechat.handleRequest.bind(wechat));

http.createServer(app).listen(port);
console.log(`listening ${port}`);
