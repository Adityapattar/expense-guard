#!/usr/bin/env node

const mongoose = require('mongoose');
require('dotenv').config();

const checkMongoDB = async () => {
  console.log('Checking MongoDB connection...');

  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-guard';
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ MongoDB is running and accessible');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.log('❌ MongoDB connection failed');
    console.log('\nPossible solutions:');
    console.log('1. Make sure MongoDB is installed and running');
    console.log('2. Check if MongoDB service is started: net start MongoDB');
    console.log('3. Verify connection string in .env file');
    console.log('4. For MongoDB Atlas, ensure IP whitelist includes your IP');
    console.log('\nError details:', error.message);
    process.exit(1);
  }
};

checkMongoDB();