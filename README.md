# Event Bus

![npm](https://img.shields.io/npm/v/@mazooma/event-bus?label=npm%20package)
![npm](https://img.shields.io/npm/l/@mazooma/event-bus)
![npm](https://img.shields.io/npm/dw/@mazooma/event-bus) ![npm](https://img.shields.io/badge/%40mazooma-event--bus-informational)

```@mazooma/event-bus``` package contains a [TypeScript](https://www.typescriptlang.org/) service dedicated to use in typescript frameworks, eg. [Angular](https://angular.io/), [Vue](https://vuejs.org/), [Next.js](https://nextjs.org/) or [NestJS](https://nestjs.com/). The service implements an event bus pattern for a real time, internal comunication between components and other services within a typescript application. It is based on the [RxJS](https://rxjs.dev/) library.

## Installing

To add the latest, stable version of the package to your project, run the following command:

```bash
npm install @mazooma/event-bus
```

or

```bash
yarn add @mazooma/event-bus
```

## Initialising

Generally, the service should be registered in the root module of a typescript application, so the ```EventBusService``` would be a singleton and available throughout the application. The following example shows how to register the service in the root module in the Angular application:

```typescript
    // app.module.ts

    ...
    import { EventBusService } from '@mazooma/event-bus';
    ...

    @NgModule({
        ...
        providers: [ EventBusService ],
        ...
    })
    ...

```


## Usage

To use a service in your application, you need to import it and inject it into your component or service as follows:

```typescript
    // my-component.component.ts

    ...
    import { EventBusService } from '@mazooma/event-bus';
    ...

    export class MyComponent {
        constructor(private eventBus: EventBusService) {
            ...
        }
    ...

```

```typescript
    // my-service.service.ts
    
    ...
    import { EventBusService } from '@mazooma/event-bus';
    ...

    export class MyService {
        constructor(private eventBus: EventBusService) {
            ...
        }
    ...

```

#### Publishing events

To publish an event, you need to call the ```emit()``` method of the service. An ```Event``` object is the only parameter required by this method and it will be published to all subscribers. While creating a ```new Event()``` object the ```routingKey``` is mandatory. The ```payload``` as an optional parameter can be skipped. For strong static typying, all methods of ```EventBusService``` and ```Event``` constructor support generic types so event bus can exchange events containing a specific types of payloads.

```typescript

    ...
    import { Event } from '@mazooma/event-bus';
    ...

    /**
     * Publish an event without payload.
     */
    this.eventBus.emit<null>(
        new Event<null>('event-without-payload')
    );

    /**
     * Publish an event with payload of any type.
     */
    this.eventBus.emit(
        new Event('event-with-any-payload', { my: 'payload' })
    );

    /**
     * Publish an event with string payload.
     */
    this.eventBus.emit<string>(
        new Event<string>('event-with-string-payload', 'Hello World')
    );

    /**
     * Publish an event with custom payload.
     */
    interface MyPayload {
        my: string;
        payload: string;
    }
    const payload: MyPayload = {
        my: 'payload',
        payload: 'Hello World'
    };
    this.eventBus.emit<MyPayload>(
        new Event<MyPayload>('event-with-my-payload', payload)
    );

```

#### Subscribing to events

To subscribe to an event, you need to call the ```on()``` method of the service. The ```routingKey``` is the first parameter of the method, and the ```callback``` function is the second parameter. The ```callback``` function will be called when the ```Event``` is published.

```typescript

    ...
    import { Event } from '@mazooma/event-bus';
    ...

    /**
     * Subscribe to event without payload.
     */
    this.eventBus.on<null>(
        'event-without-payload',
        () => {
            ...
        }
    );

    /**
     * Subscribe to event with payload of any type.
     */
    this.eventBus.on(
        'event-with-any-payload',
        (event: Event) => {
            ...
        }
    );

    /**
     * Subscribe to event with string payload.
     */
    this.eventBus.on<string>(
        'event-with-string-payload',
        (event: Event<string>) => {
            ...
        }
    );

    /**
     * Subscribe to event with custom payload.
     */
    interface MyPayload {
        my: string;
        payload: string;
    }
    this.eventBus.on<MyPayload>(
        'event-with-my-payload',
        (event: Event<MyPayload>) => {
            ...
        }
    );

```