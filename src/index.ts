import { Subject, filter, map, Subscription } from 'rxjs';

export class EventBusService {
  private subject = new Subject<any>();

  public on<T>(routingKey: string, callback: any): Subscription {
    return this.subject
      .pipe(
        filter((e: Event<T>) => e && e.routingKey === routingKey),
        map((e: Event<T>) => e.payload),
      )
      .subscribe(callback);
  }

  public emit<T>(event: Event<T>) {
    this.subject.next(event);
  }
}

export class Event<T> {
  constructor(public routingKey: string, public payload?: T) {}
}
