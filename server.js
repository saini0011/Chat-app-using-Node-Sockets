var PORT = process.env.PORT||3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname+'/public'));
var clientInfo={};

io.on('connection',function(socket){
	console.log('User Connected socket.io');

	socket.on('joinRoom',function(req){
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message',{
			name: 'System',
			text:req.name + 'has joined',
			timeStamp:moment().valueOf()
		})

	});

	socket.on('message',function(message){
		console.log('message recieved '+message.text);

		//socket.broadcast.emit('message',message);
		message.timeStamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message',message);
	});

	socket.emit('message',{
		name:'System',
		text:'Welcome to chat application!',
		timeStamp: moment().valueOf()
	});
});

http.listen(PORT, function(){

	console.log('server.started');

});