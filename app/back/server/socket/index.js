var socketio = require('socket.io');
serverModule.io = socketio(serverModule.server);
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
