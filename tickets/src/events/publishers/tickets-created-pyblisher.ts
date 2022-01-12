import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@angara_digital/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
