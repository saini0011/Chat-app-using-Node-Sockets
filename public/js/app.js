var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();
//var moment = moment();
console.log(name);
console.log(room);

socket.on('connect',function(){
  console.log('connected to socket.io server');
});

socket.on('message',function(message){
  var momentTimeStamp = moment.utc(message.timeStamp);
  console.log('new message:',message.text);
  var $message = jQuery('.messages');
  $message.append('<p><strong>'+ message.name +' '+ momentTimeStamp.local().format('h:mm a') +'</strong></p>')
  $message.append('<p>'+ message.text + '</p>')
  
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