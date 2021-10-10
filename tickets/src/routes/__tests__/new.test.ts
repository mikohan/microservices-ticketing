import request from 'supertest';
import { app } from '../../app';

it('has a router handler listening on /app/tickets for post request', async () => {
  const response = await request(app).post('/app/tickets').send({});

  expect(response.status).not.toEqual(404);
});
it('can only assessed if the user is signed in', async () => {});
it('returns an error if an invalid title is provided', async () => {});
it('returns an error if an invalid price is provided', async () => {});
it('creates a ticket with valid inputs', async () => {});
