import { BookProcessor, BookStatus } from './bookProcessor';

const timeBeforeTest = new Date();
const userId = '123';
const preferredBranch = 'xyz';
const bookIsbn = 'ISBN1';

describe('when putting hold response is successful', () => {
  describe('and fetch holds returns the book we requested', () => {
    it('should return newHoldCreated true', async () => {});
    it('should return the hold details', async () => {});
  });

  describe('but fetch holds does not return the book we requested', () => {
    it('should return newHoldCreated false', async () => {});
  });

  it('should return the new hold details', async () => {
    const subject = BookProcessor.createNull();
    const result = await subject.tryPlaceHold(userId, preferredBranch, bookIsbn);
    expect(result.newHoldCreated).toBe(true);
    expect(result.newBookHold).toBeDefined();
    expect(result.newBookHold!.heldDate).toBeBetween(timeBeforeTest, new Date());
    expect(result.newBookHold!.holdStatus).toBe(BookStatus.OnHold);
    expect(result.newBookHold!.bookIsbn).toBe(bookIsbn);
  });
});

describe('when putting hold response is unsuccessful', () => {
  it('should return newHoldCreated false', async () => {
    const subject = BookProcessor.createNull({ holdSuccessful: false });
    const result = await subject.tryPlaceHold(userId, preferredBranch, bookIsbn);
    expect(result.newHoldCreated).toBe(false);
  });
});
