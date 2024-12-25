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

import { ChatRoom } from '../models/chat-room';
import { createChatRoom } from '../fn/chat-room/create-chat-room';
import { CreateChatRoom$Params } from '../fn/chat-room/create-chat-room';
import { deleteChatRoom } from '../fn/chat-room/delete-chat-room';
import { DeleteChatRoom$Params } from '../fn/chat-room/delete-chat-room';
import { getChatRoomById } from '../fn/chat-room/get-chat-room-by-id';
import { GetChatRoomById$Params } from '../fn/chat-room/get-chat-room-by-id';

@Injectable({ providedIn: 'root' })
export class ChatRoomService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createChatRoom()` */
  static readonly CreateChatRoomPath = '/chatrooms/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createChatRoom()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createChatRoom$Response(params: CreateChatRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createChatRoom(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createChatRoom$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createChatRoom(params: CreateChatRoom$Params, context?: HttpContext): Observable<number> {
    return this.createChatRoom$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getChatRoomById()` */
  static readonly GetChatRoomByIdPath = '/chatrooms/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getChatRoomById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChatRoomById$Response(params: GetChatRoomById$Params, context?: HttpContext): Observable<StrictHttpResponse<ChatRoom>> {
    return getChatRoomById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getChatRoomById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChatRoomById(params: GetChatRoomById$Params, context?: HttpContext): Observable<ChatRoom> {
    return this.getChatRoomById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ChatRoom>): ChatRoom => r.body)
    );
  }

  /** Path part for operation `deleteChatRoom()` */
  static readonly DeleteChatRoomPath = '/chatrooms/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteChatRoom()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteChatRoom$Response(params: DeleteChatRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteChatRoom(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteChatRoom$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteChatRoom(params: DeleteChatRoom$Params, context?: HttpContext): Observable<void> {
    return this.deleteChatRoom$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}