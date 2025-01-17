import { Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { CreateComponent } from './create/create.component';
import { MyfeedComponent } from './myfeed/myfeed.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedPostComponent } from './saved-post/saved-post.component';
import { StoreComponent } from './store/store.component';
import { NotificationsComponent } from '../right/notifications/notifications.component';
import { ChatComponent } from '../right/chat/chat.component';
import { FriendRequestsComponent } from '../right/friend-requests/friend-requests.component';
import { mobileOnlyGuardGuard } from '../../shared/guards/mobile-only-guard.guard';
import { ChatroomComponent } from '../right/chatroom/chatroom.component';


export const CENTER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'explore',
    pathMatch: 'full',
  },
  {
    path: 'explore',
    component: ExploreComponent,
  },
  {
    path: "explore/myfeed",
    component: MyfeedComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'store',
    component: StoreComponent,
  },
  {
    path: 'saved',
    component: SavedPostComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'friends-requests',
    component: FriendRequestsComponent,
    canActivate: [mobileOnlyGuardGuard],
  }
  ,
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [mobileOnlyGuardGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [mobileOnlyGuardGuard],
  },
  {
      path: 'chat/chatroom/:id',
      component: ChatroomComponent,
      canActivate: [mobileOnlyGuardGuard],
  }
];
