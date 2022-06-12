const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const colors = require('colors');

// Grab port info from config
const PORT = process.env.PORT || 5000;

// Connect to Mongo

// Initialize app
const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes

// Serve Frontend in production
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  );
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the FK Portfolio API' });
  });
}


// Listen for app

app.listen(PORT, console.log(`Server runniing in ${process.env.NODE_ENV} mode on port ${PORT}`))