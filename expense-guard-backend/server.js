const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const Expense = require('./models/Expense');
const Category = require('./models/Category');

const app = express();
const port = 3000;

// In-memory storage for fallback
let expenses = [];
let nextId = 1;
let categories = ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Health', 'Education', 'Other'];
let isMongoConnected = false;

// Connect to MongoDB
connectDB().then(connected => {
  isMongoConnected = connected;
  
  // Start server after MongoDB connection attempt
  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  
  server.on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
  });
  
  server.on('listening', () => {
    console.log(`Server is listening on port ${port}`);
  });
  
}).catch(error => {
  console.error('Failed to initialize database connection:', error);
  process.exit(1);
});