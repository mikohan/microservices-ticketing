import nats, { Message, Stan } from 'node-nats-streaming';
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

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan){
    this.client = client;
  }

  subscriptionOptions(){
    return this.client.subscriptionOptions()
    .setDeliverAllAvailable()
    .setManualAckMode(true)
    .setAckWait(this.ackWait)
    .setDurableName(this.queueGroupName)
  }
  listen(){
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    )
    subscription.on('message', (msg: Message) => {
      console.log(
        `Message received: ${this.subject} / ${this.queueGroupName}`
      )
    })
  }
  parseMessage(msg: Message) {
    const data = msg.getData();
  }

}