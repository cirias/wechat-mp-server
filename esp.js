const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const config = require('./config');

const MAX_RECORDS_COUNT = 30 * 24 * 60;
const records = [];

server.on('message', (msg, rinfo) => {
  console.log(`[esp] receive msg: ${msg}`);

  const values = msg.toString().split(' ');
  if (values.length !== 3) {
    console.log(`[esp] invalid msg: ${msg}`);
    return;
  }

  const [id, temperature, humidity] = values;
  const record = {
    timestamp: Date.now(),
    temperature: Number(temperature),
    humidity: Number(humidity),
  };
  records.push(record);

  if (records.length > MAX_RECORDS_COUNT) {
    records.splice(0, records.length - MAX_RECORDS_COUNT);
  }
});

server.on('error', (err) => {
  console.log(`[esp] error:\n${err.stack}`);
  server.close();
});

server.on('listening', () => {
  var address = server.address();
  console.log(`[esp] listening ${address.address}:${address.port}`);
});

server.bind(config.esp.port);

module.exports = {
  records,
};
