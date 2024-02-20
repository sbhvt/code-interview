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

export class App {
  // eslint-disable-next-line class-methods-use-this
  async processHolds(_userId: string): Promise<BookHold> {
    return {
      holdStatus: BookStatus.OnHold,
      heldDate: new Date(),
      expectedDate: new Date(),
      bookIsbn: '1234',
    };
  }
}
