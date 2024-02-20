/* eslint-disable max-classes-per-file */
import { HttpClient } from '../infrastructure/http';
import {
  GetResourceAvailabilityResponse,
  GetUserHoldsResponse,
  PostHoldRequest,
  PostHoldResponse,
} from './responseTypes';

const holdsApiRoute = (userId: string) => `/holds/${userId}`;
const resourceAvailabilityRoute = (resourceId: string) => `/availability/${resourceId}`;

export class HoldsApi {
  constructor(private httpClient: HttpClient = HttpClient.create()) {}

  async post(userId: string, body: PostHoldRequest) {
    return this.httpClient.post<PostHoldResponse>(holdsApiRoute(userId), { body });
  }

  async get(userId: string) {
    return this.httpClient.get<GetUserHoldsResponse>(holdsApiRoute(userId));
  }
}
export class AvailabilityApi {
  constructor(private httpClient: HttpClient = HttpClient.create()) {}

  async get(resourceId: string) {
    return this.httpClient.get<GetResourceAvailabilityResponse>(resourceAvailabilityRoute(resourceId));
  }
}
