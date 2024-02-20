// Generated by https://quicktype.io

export interface BranchId {
  name: string;
  code: string;
}

export interface Availability {
  bibType: 'PHYSICAL' | 'DIGITAL';
  availabilityLocationType: string;
  status: 'AVAILABLE' | 'CHECKED_OUT' | 'HOLD' | 'IN_TRANSIT';
  circulationType: 'REQUEST' | 'OTHER';
  libraryUseOnly: boolean;
  heldCopies: number;
  availableCopies: number;
  totalCopies: number;
  onOrderCopies: number;
  volumesCount: number;
  localisedStatus: 'AVAILABLE_IN_BRANCH' | 'CHECKED_OUT' | 'HELD_IN_BRANCH' | 'IN_TRANSIT_TO_BRANCH';
  eresourceDescription: null;
  eresourceUrl: null;
  singleBranch: boolean;
  branchId: BranchId;
  libraryStatus: 'Checked In' | 'Checked Out' | 'On Hold' | 'In Transit';
  group?: 'AVAILABLE_ITEMS' | 'UNAVAILABLE_ITEMS';
  statusType: 'AVAILABLE' | 'UNAVAILABLE';
}

export interface BookAvailability {
  availability: Availability[];
}

// Generated by https://quicktype.io

export interface ResourceMetadata {
  dvd_title?: string;
  book_title?: string;
  book_author?: string;
  book_publisher?: string;
  book_genre?: string;
}

export enum ResourceType {
  Book = 'book',
  DVD = 'dvd',
}
export interface HoldDetails {
  date_requested: string;
  status:
    | 'AVAILABLE_AT_REQUESTED_BRANCH'
    | 'CHECKED_OUT'
    | 'HOLD_REQUESTED'
    | 'HELD_AT_REQUESTED_BRANCH'
    | 'IN_TRANSIT_TO_REQUESTED_BRANCH';
  date_estimated: null | string;
  branch_requested_from: string;
  branch_requested_to: string;
}
export interface UserHold {
  resource_type: ResourceType;
  isbn: string;
  hold_details: HoldDetails;
  resource_metadata: ResourceMetadata;
}

export type PostHoldRequest = { resource_type: 'book' | 'dvd'; isbn: string; branch_requested_to: string };
export type PostHoldResponse = { success: boolean };

export type GetUserHoldsResponse = UserHold[];
export type GetResourceAvailabilityResponse = {
  availability: Availability[];
};
