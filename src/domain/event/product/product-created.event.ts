import { IEvent } from "../@shared/event.interface";

export class ProductCreatedEvent implements IEvent {
  dateTimeOccured: Date;
  data: any;

  constructor(data: any) {
    this.dateTimeOccured = new Date();
    this.data = data;
  }
}
