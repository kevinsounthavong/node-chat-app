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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  // implementing Mustache JS rendering method
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

// Setting up Acknowledgements
/*
socket.emit('createMessage', {
  from: 'Frank',
  text: 'Ho'
}, function (data) {
  console.log('Got it', data);
});*/

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });
  jQuery('#messages').append(html);
  /*
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);

  li.append(a);
  jQuery('#messages').append(li);*/
});

// Getting client's location
var locationButton = jQuery('#send-location');
locationButton.on('click', function (e) {
  if (!navigator.geolocation)
  {
    return alert('Geolocation not supported by your browser.');
  }

  // prevent spamming of send location button
  locationButton.attr('disable', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (error) {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });

});