import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
// added comment to not forget to publish

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to nats');

  const data = JSON.stringify({
    id: '123',
    title: 'my ticket',
    price: 20,
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  });
});
