/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Attachment } from '../models/attachment';
import { ChatRoom } from '../models/chat-room';
import { User } from '../models/user';
export interface Message {
  attachments?: Array<Attachment>;
  chatRoom?: ChatRoom;
  content: string;
  createdBy?: number;
  createdData?: string;
  id?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  owner?: User;
  sentAt?: string;
  status?: 'SENT' | 'DELIVERED' | 'READ';
}