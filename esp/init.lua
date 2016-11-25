ID = ""

SSID = ""
SSID_PASSWORD = ""

DHT_PIN = 4

SERVER_HOST = ""
SERVER_PORT = 13131


wifi.setmode(wifi.STATION)
wifi.sta.config(SSID, SSID_PASSWORD)


socket = net.createConnection(net.UDP, 0)
socket:connect(SERVER_PORT, SERVER_HOST)


function loop()
  status, temp, humi, temp_dec, humi_dec = dht.read(DHT_PIN)
  if status == dht.OK then
    -- Integer firmware using this example
    print(string.format("DHT Temperature:%d.%03d;Humidity:%d.%03d\r\n",
      math.floor(temp),
      temp_dec,
      math.floor(humi),
      humi_dec
    ))

    socket:send(string.format("%s %d.%03d %d.%03d", ID,
      math.floor(temp),
      temp_dec,
      math.floor(humi),
      humi_dec
    ))
  elseif status == dht.ERROR_CHECKSUM then
    print("DHT Checksum error.\r\n")
  elseif status == dht.ERROR_TIMEOUT then
    print("DHT timed out.\r\n")
  end
end

tmr.alarm(0, 5000, tmr.ALARM_SINGLE, loop)
