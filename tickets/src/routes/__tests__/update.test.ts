import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

const title = 'My title';
const price = 20;

it('returns 404 if id is not exists', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', signin())
    .send({
      title,
      price,
    })
    .expect(404);
});
it('return 401 if user in not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title,
      price,
    })
    .expect(401);
});
it('returns 401 if user does not own the ticket', async () => {});
it('returns 404 if the user provides an invalid title or price', async () => {});
it('updates a tickets and return 202', async () => {});
