/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Message } from '../models/message';
import { User } from '../models/user';
export interface ChatRoom {
  active?: boolean;
  createdBy?: number;
  createdData?: string;
  id?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  messages?: Array<Message>;
  name: string;
  user1?: User;
  user2?: User;
}