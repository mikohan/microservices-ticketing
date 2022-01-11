import nats from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  queueGroupName: string = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: nats.Message): void {
    console.log("Event data!", data);
    msg.ack();
  }
}
