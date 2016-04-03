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
    console.log(req);
    if (req.url === '/blink') {
      res.end('changed');
    } else {
      res.end('works');
    }
  }).listen(app.deviceIP + ':' + 3000);
}

function changePinLevel(pin) {
  var level = GPIO.read(pin);
  GPIO.setmode(pin, 0, 0);
  GPIO.write(pin, !level);
}
