/* globals GPIO, Wifi, registerDevice, Http */

var app = {};
Wifi.setup('Google.com', 'AJT11may1962ajt');
Wifi.changed(function () {
  var status = Wifi.status();
  if (status === 'got ip') {
    app.deviceIP = Wifi.ip(1);
    console.log('Connected to: ' + Wifi.show());
    console.log('IP address: ' + app.deviceIP);
    registerDevice();
    createServer();
  } else {
    console.log('Wifi current status: ' + status);
  }
});

function createServer() {
  app.server = Http.createServer(function(req, res) {
    var urlObj = parseUrl(req.url);
    console.log(urlObj);
    if (urlObj.url === 'gpio') {
      if (urlObj.method === 'get') {
        res.end(GPIO.read(urlObj.id));
      } else if (urlObj.method === 'set') {
        GPIO.setmode(urlObj.id, 0, 0);
        GPIO.write(urlObj.id, urlObj.value);
        res.end(GPIO.read(urlObj.id));
      } else {
        res.end('no api for current request');
      }
    } else {
      res.end('no api for current request');
    }
  }).listen(app.deviceIP + ':' + 3000);
}

function parseUrl(url) {
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

function changePinLevel(pin) {
  var level = GPIO.read(pin);
  GPIO.setmode(pin, 0, 0);

}
