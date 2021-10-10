import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined in kubernetis secure pod');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined as env in pod');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Connected to mongoDB');
  } catch (e) {
    console.log(e);
  }
  app.listen(3000, () => {
    console.log('Listening on 3000!');
  });
};

start();
