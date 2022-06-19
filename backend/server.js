const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const colors = require('colors');

// Grab port info from config
const PORT = process.env.PORT || 5000;

// Connect to Mongo
connectDB();

// Initialize app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/characters', require('./routes/characterRoutes'));

// Serve Frontend in production
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Serve index.html from build folder
  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  );
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the FK Portfolio API' });
  });
}

// Listen for server

server.listen(
  PORT,
  console.log(`Server runniing in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
