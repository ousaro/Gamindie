/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseFriendShipResponse } from '../../models/page-response-friend-ship-response';

export interface GetFriends$Params {
  userId: number;
  page?: number;
  size?: number;
}

export function getFriends(http: HttpClient, rootUrl: string, params: GetFriends$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFriendShipResponse>> {
  const rb = new RequestBuilder(rootUrl, getFriends.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseFriendShipResponse>;
    })
  );
}

getFriends.PATH = '/friendships/friends/{userId}';
