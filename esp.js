const crypto = require('crypto');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const MAX_RECORDS_COUNT = 30 * 24 * 60;
const records = [];

server.on('message', (msg, rinfo) => {
  const [signature, timestamp, payload...] = msg.split(' ');
  const str = timestamp + token;
  const sign = crypto.createHash('sha1').update(str).digest('hex');
  if (signature !== sign) {
    console.log(`server got invalid msg: ${msg} from ${rinfo.address}:${rinfo.port}`);
    return;
  }

  const [temperature, humidity] = payload;
  const record = {
    timestamp,
    temperature: Number(temperature),
    humidity: Number(humidity),
  };
  records.push(record);

  if (records.length > MAX_RECORDS_COUNT) {
    records.splice(0, records.length - MAX_RECORDS_COUNT);
  }
});

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);

module.exports = {
  records,
};
