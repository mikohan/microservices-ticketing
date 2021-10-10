import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined in kubernetis secure pod');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {});
    console.log('Connected to mongoDB');
  } catch (e) {
    console.log(e);
  }
  app.listen(3000, () => {
    console.log('Listening on 3000!');
  });
};

start();