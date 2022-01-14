import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined in kubernetis secure pod');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined in kubernetes yaml file');
  }
  try {
    await natsWrapper.connect('ticketing', 'lslsl', 'http://nats-srv:4222');
    natsWrapper.client.on('clese', () => {
      console.log('NATS connection closed');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
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
