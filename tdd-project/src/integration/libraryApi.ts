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

export class PostHoldsApi {
  constructor(private httpClient: HttpClient = HttpClient.create()) {}

  static createNull(success = true) {
    return new PostHoldsApi(
      HttpClient.createNull([{ whenRequest: { method: 'post' }, responseData: { success } }]),
    );
  }

  async post(userId: string, body: PostHoldRequest) {
    return this.httpClient.post<PostHoldResponse>(holdsApiRoute(userId), { body });
  }
}

export class GetHoldsApi {
  constructor(private httpClient: HttpClient = HttpClient.create()) {}

  static createNull(stubbedResponseData?: any) {
    return new GetHoldsApi(
      HttpClient.createNull([{ whenRequest: { method: 'get' }, responseData: stubbedResponseData }]),
    );
  }

  async get(userId: string) {
    return this.httpClient.get<GetUserHoldsResponse>(holdsApiRoute(userId));
  }
}

export class GetAvailabilityApi {
  constructor(private httpClient: HttpClient = HttpClient.create()) {}

  async get(resourceId: string) {
    return this.httpClient.get<GetResourceAvailabilityResponse>(resourceAvailabilityRoute(resourceId));
  }
}
