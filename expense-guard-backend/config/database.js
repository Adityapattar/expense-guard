require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-guard';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed, falling back to in-memory storage:', error.message);
    console.log('Server will continue with in-memory storage. Data will not persist.');
    return false;
  }
};

module.exports = connectDB;