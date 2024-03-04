import { BookHoldResponse, BookProcessor } from './bookProcessor';

export class App {
  constructor(private bookProcessor: BookProcessor = BookProcessor.create()) {}

  // eslint-disable-next-line class-methods-use-this
  async tryReserveNextBookForUser(userId: string): Promise<BookHoldResponse> {
    // basic steps from whiteboard or pseudocode, etc.

    // lookup users preferred branch and desired books by user id
    // if books on list
    //    get availability status for the books on the list
    //    determine what book to put on hold based on availability

    // ==================
    //    if any avail
    //        put on hold
    //        return the hold details on the newly held book

    return this.bookProcessor.tryPlaceHold(userId, 'preferredBranch', 'ISBN1');
  }
}
