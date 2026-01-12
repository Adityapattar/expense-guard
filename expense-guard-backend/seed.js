const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Category = require('./models/Category');

const seedCategories = async () => {
  try {
    await connectDB();

    // Check if categories already exist
    const existingCategories = await Category.find();
    if (existingCategories.length > 0) {
      console.log('Categories already seeded');
      return;
    }

    const defaultCategories = [
      'Food',
      'Travel',
      'Bills',
      'Shopping',
      'Entertainment',
      'Health',
      'Education',
      'Other'
    ];

    const categoryPromises = defaultCategories.map(name =>
      new Category({ name }).save()
    );

    await Promise.all(categoryPromises);
    console.log('Default categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedCategories();