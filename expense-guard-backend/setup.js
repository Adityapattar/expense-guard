#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Expense Guard Backend Setup\n');

const runCommand = (command, description) => {
  try {
    console.log(`📋 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log('✅ Done\n');
  } catch (error) {
    console.log(`❌ Failed: ${description}\n`);
    throw error;
  }
};

const checkFileExists = (filePath) => {
  return fs.existsSync(path.join(__dirname, filePath));
};

async function setup() {
  try {
    // Check if .env exists
    if (!checkFileExists('.env')) {
      console.log('⚠️  .env file not found. Creating one...');
      const envContent = `# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/expense-guard

# Server Configuration
PORT=3000`;
      fs.writeFileSync('.env', envContent);
      console.log('✅ .env file created\n');
    }

    // Install dependencies
    runCommand('npm install', 'Installing dependencies');

    // Check MongoDB connection
    runCommand('npm run check-db', 'Checking MongoDB connection');

    // Seed database
    runCommand('npm run seed', 'Seeding database with default categories');

    console.log('🎉 Setup completed successfully!');
    console.log('\nTo start the server, run: npm start');
    console.log('Server will be available at: http://localhost:3000');

  } catch (error) {
    console.log('❌ Setup failed. Please check the error messages above.');
    console.log('\nTroubleshooting:');
    console.log('1. Make sure MongoDB is installed and running');
    console.log('2. Check your internet connection for npm install');
    console.log('3. Verify MongoDB connection string in .env file');
    process.exit(1);
  }
}

setup();