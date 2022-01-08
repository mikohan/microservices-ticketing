import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', ()=>{
    console.log('Connection closed!');
    process.exit();
  })

  const subscription = stan.subscribe('ticket:created');
  subscription.on('message', (msg: Message) => {
    const data = msg.getData();
    if (typeof data === 'string') {
      console.log(`Recieved enent #${msg.getSequence()}, with data ${data}`);
    }
  });
});

process.on('SIGINT', ()=> stan.close());
process.on('SIGTERM', ()=> stan.close());