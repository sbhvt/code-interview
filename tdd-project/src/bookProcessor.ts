import { PostHoldsApi } from './integration/libraryApi';

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
export class BookProcessor {
  constructor(private bookHoldApi: PostHoldsApi) {}

  static create() {
    return new BookProcessor(new PostHoldsApi());
  }

  static createNull(config: any = { holdSuccessful: true }) {
    return new BookProcessor(PostHoldsApi.createNull(config.holdSuccessful));
  }

  // eslint-disable-next-line class-methods-use-this
  async tryPlaceHold(userId: string, branchId: string, bookIsbn: string) {
    // post to the api

    const postResponse = await this.bookHoldApi.post(userId, {
      branch_requested_to: branchId,
      isbn: bookIsbn,
      resource_type: 'book',
    });

    const wasSuccessful = Boolean(postResponse.status === 200 && postResponse.data?.success);

    if (!wasSuccessful) {
      return { newHoldCreated: false };
    }

    // if success, fetch from api

    // try to find from the result

    // map to return

    return {
      newHoldCreated: true,
      newBookHold: {
        holdStatus: BookStatus.OnHold,
        heldDate: new Date(),
        expectedDate: new Date(),
        bookIsbn,
      },
    };
  }
}
