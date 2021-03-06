var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();
//var moment = moment();
console.log(name);
console.log(room);

jQuery('.room-title').text(room);

socket.on('connect',function(){
  console.log('connected to socket.io server');
  socket.emit('joinRoom',{
   name:name,
   room:room
  });
});




socket.on('message',function(message){
  var momentTimeStamp = moment.utc(message.timeStamp);
  console.log('new message:',message.text);
  var $messages = jQuery('.messages');
  var $message = jQuery('<li class = "list-group-item"></li>');
  $message.append('<p><strong>'+ message.name +' '+ momentTimeStamp.local().format('h:mm a') +'</strong></p>');
  $message.append('<p>' + message.text + '</p>');
  $messages.append($message);
});

//handles submitting of new message

var $form = jQuery('#message-form');
$form.on('submit',function(event){
  event.preventDefault();

  var $message = $form.find('input[name=message]'); 
  socket.emit('message',{
   name: name,
   text: $message.val()
  });
   $message.val('');
});