import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose.connect(process.env.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
};

export default connectDB;