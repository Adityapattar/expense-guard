# Expense Guard Backend

A Node.js backend for the Expense Guard application with MongoDB integration.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installing MongoDB

#### Windows (using Chocolatey - recommended)
```bash
choco install mongodb
```

#### Windows (manual installation)
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install MongoDB
3. Add MongoDB bin directory to PATH
4. Create data directory: `mkdir C:\data\db`
5. Start MongoDB: `mongod`

#### Using MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get connection string and update `.env` file

### Alternative: MongoDB in Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Quick Setup

Run the automated setup script:

```bash
npm run setup
```

This will:
- Install dependencies
- Create .env file if it doesn't exist
- Check MongoDB connection
- Seed the database with default categories

## Manual Setup

If you prefer manual setup:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in `.env` file if needed

3. Check MongoDB connection:
   ```bash
   npm run check-db
   ```

4. Seed the database with default categories:
   ```bash
   npm run seed
   ```

5. Start the server:
   ```bash
   npm start
   ```

The server will run on http://localhost:3000

## API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get expense by ID
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Analytics
- `GET /api/analytics/total` - Get total expenses
- `GET /api/analytics/by-category` - Get expenses by category
- `GET /api/analytics/monthly` - Get monthly expenses

## Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/expense-guard
PORT=3000
```

## Database Models

### Expense
- `amount` (Number, required)
- `description` (String, required)
- `category` (String, required)
- `date` (Date, default: now)
- `createdAt`, `updatedAt` (timestamps)

### Category
- `name` (String, required, unique)
- `createdAt`, `updatedAt` (timestamps)