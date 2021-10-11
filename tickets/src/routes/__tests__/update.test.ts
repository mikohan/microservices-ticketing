import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

const title = 'My title';
const price = 20;

const createTicketAndCookie = () => {
  const cookie = signin();

  const createTicket = request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title,
      price,
    });
  return { cookie, createTicket };
};

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
it('returns 401 if user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title, price });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', signin())
    .send({
      title: 'Updated title',
      price: 1000,
    })
    .expect(401);
});
it('returns 404 if the user provides an invalid title or price', async () => {
  const { cookie, createTicket } = createTicketAndCookie();
  const response = await createTicket;
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: price,
    })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: title,
      price: -20,
    })
    .expect(400);
});
it('updates a tickets and return 202', async () => {
  const newTitle = 'new title';
  const newPrice = 100;

  const { cookie, createTicket } = createTicketAndCookie();
  const response = await createTicket;
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: newTitle,
      price: newPrice,
    })
    .expect(200);
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(newTitle);
  expect(ticketResponse.body.price).toEqual(newPrice);
});
