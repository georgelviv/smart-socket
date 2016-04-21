function onInit() {
  var wifi = require('Wifi');
  var http = require('http');

  var app = {};

  function setOutput() {
    for (var i = 0; i <= 10; i++) {
      NodeMCU.D0
    }
  }

  function parsePath(url) {
    var obj = {};
    var tempArray = url.split('/');
    obj.url = tempArray[1];
    if (tempArray[2]) {
      tempArray = tempArray[2].split('?');
      obj.id = Number(tempArray[0]);
      if (tempArray[1]) {
        tempArray = tempArray[1].split('&');
        tempArray.forEach(function (option) {
          var arr = option.split('=');
          if (arr[0] === 'method') {
            obj.method = arr[1];
            return;
          }
          if (arr[0] === 'value') {
            obj.value = (arr[1] === 'false') ? false: true;
            return;
          }
        });
      }
    }
    return obj;
  }

  function createServer() {
    app.server = http.createServer(function(req, res) {
      if (req.headers.secret !== 'secret-key') {
        res.end('wrong secret');
        return;
      }
      var urlObj = parsePath(url.parse(req.url).path);
      if (urlObj.url === 'gpio') {
        pinMode(NodeMCU['D' + urlObj.id], 'output');
        if (urlObj.method === 'get') {
          res.end(NodeMCU['D' + urlObj.id].read());
        } else if (urlObj.method === 'set') {
          NodeMCU['D' + urlObj.id].write(urlObj.value);
          res.end(NodeMCU['D' + urlObj.id].read());
        } else {
          res.end('no api for current request');
        }
      } else if (urlObj.url === 'status') {
        res.end('connected');
      } else {
        res.end('no api for current request');
      }
    }).listen(3000);
  }

  function connectToWifi() {
    var SSID = 'Google.com';
    var password = 'AJT11may1962ajt';

    function onConnection() {
      var ip = wifi.getIP().ip;
      app.localIP = ip;
      console.log('IP address: ' + ip);
      createServer();
    }
    wifi.connect(SSID, {password: password}, onConnection);
  }

  connectToWifi();
}
