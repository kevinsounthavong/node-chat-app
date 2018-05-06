const path = require('path');
const http = require("http");
// __dirname is server folder in this context
const publicPath = path.join(__dirname, "../public");
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000; // set up for Heroku
const app = express();

// HTTP is used behinds the scenes for Express
var server = http.createServer(app);
var io = socketIO(server); // web sockets server

// Using middleware
app.use(express.static(publicPath)); // serve static files in public folder

// Listen for a new connection - client connected to server
// AND do something when it does
io.on('connection', (socket) => {
  console.log('New User connected');

  // Creates an event and propagates it
  // to client that connected
  // newMessage Event
  /*
  socket.emit('newMessage', {
    from: 'John Cena',
    text: 'YOU CANNOT SEE ME',
    createdAt: 456
  });*/

  // socket.emit to user who joined FROM admin, TEXT Welcome to chat app
  // socket.broadcast.emit to everyone but the client who joined FROM Admin, text NEW user joined

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', ' New User Joined'));

  // Listen to createMessage event sent by client
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    // emits an event to ALL connections
    
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback(); // send an event back to the frontend
    // send the event to everyone BUT this socket
    /*
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })*/
  });

  
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  // when a client disconnects
  socket.on('disconnect', ()=>{
    console.log("User was disconnected");
  });
});
// HTTP is used behinds the scenes for Express
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});