const path = require('path');
const http = require("http");
// __dirname is server folder in this context
const publicPath = path.join(__dirname, "../public");
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000; // set up for Heroku
const app = express();

// HTTP is used behinds the scenes for Express
var server = http.createServer(app);
var io = socketIO(server); // web sockets server
var users = new Users();

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
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room))
    {
      return callback('Name and room name are required');
    }

    // special place for people to talk
    // who are in the same room
    socket.join(params.room);
    // leave a room by name socket.leave("Some Room")

    // io.emit -> io.to('The Office Fans').emit
    // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
    // socket.emit
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });


  // Listen to createMessage event sent by client
  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
// emits an event to ALL connections
    
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
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
    var user = users.getUser(socket.id);
    if (user)
    {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  // when a client disconnects
  socket.on('disconnect', ()=>{
    console.log("User was disconnected");
    var user = users.removeUser(socket.id);

    if (user) {
      // update user list
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});
// HTTP is used behinds the scenes for Express
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});