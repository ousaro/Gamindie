/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChatRoomResponse } from '../../models/chat-room-response';

export interface GetChatRoom$Params {
  user1Id: number;
  user2Id: number;
}

export function getChatRoom(http: HttpClient, rootUrl: string, params: GetChatRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ChatRoomResponse>>> {
  const rb = new RequestBuilder(rootUrl, getChatRoom.PATH, 'get');
  if (params) {
    rb.path('user1Id', params.user1Id, {});
    rb.path('user2Id', params.user2Id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ChatRoomResponse>>;
    })
  );
}

getChatRoom.PATH = '/chatrooms/{user1Id}/{user2Id}';
