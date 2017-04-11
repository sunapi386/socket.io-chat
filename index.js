var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  io.emit('a user connected', { for: 'everyone' });
  socket.on('chat message', function(msg){
    console.log('chat message' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('a user disconnected');
    io.emit('a user disconnected', { for: 'everyone' });
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
