import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routs/current-user';
import { signinRouter } from './routs/signin';
import { signupRouter } from './routs/signup';
import { signoutRouter } from './routs/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on 3000!');
});
