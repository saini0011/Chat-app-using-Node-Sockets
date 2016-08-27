var socket = io();
//var moment = moment();

socket.on('connect',function(){
  console.log('connected to socket.io server');
});

socket.on('message',function(message){
  var momentTimeStamp = moment.utc(message.timeStamp);
  console.log('new message:',message.text);
  jQuery('.messages').append('<p><strong>' + momentTimeStamp.local().format('h:mm a') + '</strong>' + message.text + '</p>');
});

//handles submitting of new message

var $form = jQuery('#message-form');
$form.on('submit',function(event){
  event.preventDefault();

  var $message = $form.find('input[name=message]'); 
  socket.emit('message',{
   text: $message.val()
  });
   $message.val('');
});