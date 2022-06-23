import { Event } from '../index';

test('My Event', () => {
  expect(new Event('ROUTING').routingKey).toBe('ROUTING');
});
