function onInit() {
  var wifi = require('Wifi');
  var app = {};

  function connectMqtt() {
    var server = 'mqtt://test.mosquitto.org';
    var client = require('MQTT').create(server);

    client.on('connected', function() {
      console.log('connected');
      mqtt.subscribe('smartsocket/superboard');
    });

    client.on('publish', function (pub) {
      console.log('topic: ' + pub.topic);
      console.log('message: ' + pub.message);
    });
  }

  function connectToWifi() {
    var SSID = 'Google.com';
    var password = 'AJT11may1962ajt';

    function onConnection() {
      var ip = wifi.getIP().ip;
      app.localIP = ip;
      console.log('IP address: ' + ip);
      D2.write(true);
      connectMqtt();
    }
    wifi.connect(SSID, {password: password}, onConnection);
  }

  connectToWifi();
}
