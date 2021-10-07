import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after sign out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  // expect(response.get('Set-Cookie')).toBeDefined();
  const response = await request(app).post('/app/users/signout').send({});
  expect(200);
  expect(response.get('Set-Cookie')).toBeUndefined();
});
