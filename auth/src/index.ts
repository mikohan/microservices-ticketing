import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routs/current-user';
import { signinRouter } from './routs/signin';
import { signupRouter } from './routs/signup';
import { signoutRouter } from './routs/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';

const app = express();

app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to mongoDB');
  } catch (e) {
    console.log(e);
  }
  app.listen(3000, () => {
    console.log('Listening on 3000!');
  });
};

start();
