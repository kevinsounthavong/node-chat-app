var socket = io(); // makes a req from client to server to open a socket and keep it open

// implementing autoscrolling
function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight(); // second to last message height

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
  {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('Connected to server');
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if(err)
    {
      alert(err);
      // redirect to root page
      window.location.href = '/';
    }
    else
    {
      console.log('No error');
    }
  });
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

socket.on('updateUserList', function (users) {
  console.log('Users List', users);
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
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