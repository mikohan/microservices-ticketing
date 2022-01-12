import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@angara_digital/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
