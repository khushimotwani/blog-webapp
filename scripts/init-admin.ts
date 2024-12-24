import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function createAdminUser() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    if (!process.env.INITIAL_ADMIN_USERNAME || !process.env.INITIAL_ADMIN_PASSWORD) {
      throw new Error('Admin credentials not provided');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await User.findOne({ username: process.env.INITIAL_ADMIN_USERNAME });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    await User.create({
      username: process.env.INITIAL_ADMIN_USERNAME,
      password: process.env.INITIAL_ADMIN_PASSWORD,
      role: 'admin'
    });

    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdminUser(); 