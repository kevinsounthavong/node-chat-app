var socket = io(); // makes a req from client to server to open a socket and keep it open
      
socket.on('connect', function () {
  console.log('Connected to server');

  // Client connects to server, creates an "createEmail"
  // and emits this email event
  // createMessage event to go to server
  /*
  socket.emit('createMessage', {
    from: 'Poopy McGee',
    text: "Message from the client"
  })*/
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// CUstom events

socket.on('newMessage', function (message) {
  console.log('GOt New message: ', message);
  // create a list item
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// Setting up Acknowledgements
socket.emit('createMessage', {
  from: 'Frank',
  text: 'Ho'
}, function (data) {
  console.log('Got it', data);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});