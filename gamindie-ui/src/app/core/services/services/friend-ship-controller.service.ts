/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { acceptFriendRequest } from '../fn/friend-ship-controller/accept-friend-request';
import { AcceptFriendRequest$Params } from '../fn/friend-ship-controller/accept-friend-request';
import { cancelFriendRequest } from '../fn/friend-ship-controller/cancel-friend-request';
import { CancelFriendRequest$Params } from '../fn/friend-ship-controller/cancel-friend-request';
import { deleteFriendRequest } from '../fn/friend-ship-controller/delete-friend-request';
import { DeleteFriendRequest$Params } from '../fn/friend-ship-controller/delete-friend-request';
import { getFriends } from '../fn/friend-ship-controller/get-friends';
import { GetFriends$Params } from '../fn/friend-ship-controller/get-friends';
import { getgetPendingRequestsFriends } from '../fn/friend-ship-controller/getget-pending-requests-friends';
import { GetgetPendingRequestsFriends$Params } from '../fn/friend-ship-controller/getget-pending-requests-friends';
import { PageResponseFriendShipResponse } from '../models/page-response-friend-ship-response';
import { sendFriendRequest } from '../fn/friend-ship-controller/send-friend-request';
import { SendFriendRequest$Params } from '../fn/friend-ship-controller/send-friend-request';

@Injectable({ providedIn: 'root' })
export class FriendShipControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `cancelFriendRequest()` */
  static readonly CancelFriendRequestPath = '/friendships/{id}/cancel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancelFriendRequest()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelFriendRequest$Response(params: CancelFriendRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return cancelFriendRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cancelFriendRequest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelFriendRequest(params: CancelFriendRequest$Params, context?: HttpContext): Observable<number> {
    return this.cancelFriendRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `acceptFriendRequest()` */
  static readonly AcceptFriendRequestPath = '/friendships/{id}/accept';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `acceptFriendRequest()` instead.
   *
   * This method doesn't expect any request body.
   */
  acceptFriendRequest$Response(params: AcceptFriendRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return acceptFriendRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `acceptFriendRequest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  acceptFriendRequest(params: AcceptFriendRequest$Params, context?: HttpContext): Observable<number> {
    return this.acceptFriendRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `sendFriendRequest()` */
  static readonly SendFriendRequestPath = '/friendships/send';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendFriendRequest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendFriendRequest$Response(params: SendFriendRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return sendFriendRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendFriendRequest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendFriendRequest(params: SendFriendRequest$Params, context?: HttpContext): Observable<number> {
    return this.sendFriendRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getgetPendingRequestsFriends()` */
  static readonly GetgetPendingRequestsFriendsPath = '/friendships/pending/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getgetPendingRequestsFriends()` instead.
   *
   * This method doesn't expect any request body.
   */
  getgetPendingRequestsFriends$Response(params: GetgetPendingRequestsFriends$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFriendShipResponse>> {
    return getgetPendingRequestsFriends(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getgetPendingRequestsFriends$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getgetPendingRequestsFriends(params: GetgetPendingRequestsFriends$Params, context?: HttpContext): Observable<PageResponseFriendShipResponse> {
    return this.getgetPendingRequestsFriends$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFriendShipResponse>): PageResponseFriendShipResponse => r.body)
    );
  }

  /** Path part for operation `getFriends()` */
  static readonly GetFriendsPath = '/friendships/friends/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFriends()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFriends$Response(params: GetFriends$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFriendShipResponse>> {
    return getFriends(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFriends$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFriends(params: GetFriends$Params, context?: HttpContext): Observable<PageResponseFriendShipResponse> {
    return this.getFriends$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFriendShipResponse>): PageResponseFriendShipResponse => r.body)
    );
  }

  /** Path part for operation `deleteFriendRequest()` */
  static readonly DeleteFriendRequestPath = '/friendships/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFriendRequest()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFriendRequest$Response(params: DeleteFriendRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteFriendRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteFriendRequest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFriendRequest(params: DeleteFriendRequest$Params, context?: HttpContext): Observable<void> {
    return this.deleteFriendRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
