/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Post } from '../models/post';
import { User } from '../models/user';
export interface Likes {
  createdBy?: number;
  createdData?: string;
  id?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  owner?: User;
  post?: Post;
}