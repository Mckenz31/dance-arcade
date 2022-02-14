const http = require('http');
const bend = require('./src/app');

const port = process.env.PORT || 8000;

bend.set('port', port);
const server = http.createServer(bend);
const { Server } = require('socket.io');

// socket start

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`user with id ${socket.id} joined room ${data}`);
    socket.broadcast.emit(
      'room_size',
      io.sockets?.adapter.rooms.get(data).size
    );
  });

  // socket.emit('count', 123); example to constantly send data to frontend

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('recieve_message', data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

// socket end

server.listen(port);
