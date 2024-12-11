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

import { Comment } from '../models/comment';
import { createComment } from '../fn/comment/create-comment';
import { CreateComment$Params } from '../fn/comment/create-comment';
import { deleteComment } from '../fn/comment/delete-comment';
import { DeleteComment$Params } from '../fn/comment/delete-comment';
import { getAllComments } from '../fn/comment/get-all-comments';
import { GetAllComments$Params } from '../fn/comment/get-all-comments';
import { getCommentById } from '../fn/comment/get-comment-by-id';
import { GetCommentById$Params } from '../fn/comment/get-comment-by-id';

@Injectable({ providedIn: 'root' })
export class CommentService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createComment()` */
  static readonly CreateCommentPath = '/comments/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComment$Response(params: CreateComment$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createComment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComment(params: CreateComment$Params, context?: HttpContext): Observable<number> {
    return this.createComment$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAllComments()` */
  static readonly GetAllCommentsPath = '/comments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllComments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllComments$Response(params?: GetAllComments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Comment>>> {
    return getAllComments(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllComments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllComments(params?: GetAllComments$Params, context?: HttpContext): Observable<Array<Comment>> {
    return this.getAllComments$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Comment>>): Array<Comment> => r.body)
    );
  }

  /** Path part for operation `getCommentById()` */
  static readonly GetCommentByIdPath = '/comments/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCommentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentById$Response(params: GetCommentById$Params, context?: HttpContext): Observable<StrictHttpResponse<Comment>> {
    return getCommentById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCommentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommentById(params: GetCommentById$Params, context?: HttpContext): Observable<Comment> {
    return this.getCommentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Comment>): Comment => r.body)
    );
  }

  /** Path part for operation `deleteComment()` */
  static readonly DeleteCommentPath = '/comments/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComment()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComment$Response(params: DeleteComment$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteComment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteComment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComment(params: DeleteComment$Params, context?: HttpContext): Observable<void> {
    return this.deleteComment$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
