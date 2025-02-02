/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Attachment } from '../models/attachment';
import { ChatRoom } from '../models/chat-room';
import { Comment } from '../models/comment';
import { FriendShip } from '../models/friend-ship';
import { GrantedAuthority } from '../models/granted-authority';
import { Likes } from '../models/likes';
import { Message } from '../models/message';
import { Post } from '../models/post';
import { Role } from '../models/role';
export interface User {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  attachment?: Attachment;
  authorities?: Array<GrantedAuthority>;
  bio?: string;
  comments?: Array<Comment>;
  createdDate?: string;
  credentialsNonExpired?: boolean;
  dateOfBirth?: string;
  email?: string;
  enabled?: boolean;
  firstname?: string;
  id?: number;
  initiatedChats?: Array<ChatRoom>;
  lastModifiedDate?: string;
  lastname?: string;
  likes?: Array<Likes>;
  messages?: Array<Message>;
  name?: string;
  password?: string;
  posts?: Array<Post>;
  profilePicture?: string;
  receivedChats?: Array<ChatRoom>;
  receivedFriendships?: Array<FriendShip>;
  roles?: Array<Role>;
  savedPosts?: Array<string>;
  sentFriendships?: Array<FriendShip>;
  socialLinks?: string;
  username?: string;
}
