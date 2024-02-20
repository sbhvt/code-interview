import { App, BookStatus } from './app';

test('happy path', async () => {
  const timeBeforeTest = new Date();
  const result = await new App().processHolds('12334');

  expect(result.heldDate).toBeBetween(timeBeforeTest, new Date());
  expect(result.holdStatus).toBe(BookStatus.OnHold);
  // anything else??
});
