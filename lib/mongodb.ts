import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  };
}

export default async function connectDB(): Promise<typeof mongoose> {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to .env.local');
  }

  if (global.mongoose.conn) {
    return global.mongoose.conn as unknown as typeof mongoose;
  }

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
    });
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
  } catch (error) {
    global.mongoose.promise = null;
    throw error;
  }

  return global.mongoose.conn;
} 