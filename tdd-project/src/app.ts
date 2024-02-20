export enum BookStatus {
  OnHold = 'OnHold',
  CheckedOut = 'CheckedOut',
  InTransit = 'InTransit',
  Available = 'Available',
}

export type BookHold = {
  holdStatus: BookStatus;
  bookIsbn: string;
  heldDate: Date;
  expectedDate: Date;
};

export type BookHoldResponse = {
  newHoldCreated: boolean;
  newBookHold?: BookHold;
};

export class App {
  // eslint-disable-next-line class-methods-use-this
  async tryReserveNextBookForUser(_userId: string): Promise<BookHoldResponse> {
    // basic steps from whiteboard or pseudocode, etc.

    // lookup users preferred branch and desired books by user id
    // if books on list
    //    get availability status for the books on the list
    //    determine what book to put on hold based on availability
    //    if any avail
    //        put on hold
    //        return the hold details on the newly held book

    return {
      newHoldCreated: true,
      newBookHold: {
        holdStatus: BookStatus.OnHold,
        heldDate: new Date(),
        expectedDate: new Date(),
        bookIsbn: '1234',
      },
    };
  }
}
