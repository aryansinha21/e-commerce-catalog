import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.log('MongoDB connection failed, running with sample data:', err.message);
  }
};

export default connectDB;
