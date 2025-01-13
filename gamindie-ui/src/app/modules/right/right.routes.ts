import { Routes } from '@angular/router';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';

export const RIGHT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'friend-requests',
    pathMatch: 'full',
  },
  {
    path: 'friend-requests',
    component: FriendRequestsComponent,
  }
  ,
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  }
];
