import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import statsRoutes from './routes/stats.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// WebSocket logic
io.on('connection', socket => {
  console.log('WebSocket client connected');

  // Optional: Emit data periodically
  const interval = setInterval(() => {
    socket.emit('statsUpdate', {
      timestamp: new Date(),
      message: 'Live stat update'
    });
  }, 5000);

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('WebSocket client disconnected');
  });
});

app.use('/stats', statsRoutes);

server.listen(3002, () => {
  console.log('log-stats-api running on port 3002');
});
