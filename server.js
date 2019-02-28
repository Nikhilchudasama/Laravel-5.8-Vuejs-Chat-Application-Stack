var app =  require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(9000);
io.on('connection', function(socket){
  console.log('Client Connected');
    socket.username = "Anonymous"

    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    socket.on('newMessage', (data) => {
        io.emit('newMessage', {body : data.body, name : socket.username});
    })

    socket.on('disconnect', function(){
        if(socket.username != 'Anonymous')
        io.emit('userLeft', {body: socket.username + ' is left the chat'})
        console.log('A user disconnected  ' + socket.username);
    });
});