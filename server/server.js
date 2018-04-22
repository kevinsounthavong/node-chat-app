const path = require('path');
const http = require("http");
// __dirname is server folder in this context
const publicPath = path.join(__dirname, "../public");
const express = require('express');
const socketIO = require('socket.io');

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

  socket.emit('newMessage', {
    from: "Admin",
    text: "Welcome to the chat app!",
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: "Admin",
    text: "New User Joined!"
  });

  // Listen to createMessage event sent by client
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    // emits an event to ALL connections
    
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // send the event to everyone BUT this socket
    /*
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })*/
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