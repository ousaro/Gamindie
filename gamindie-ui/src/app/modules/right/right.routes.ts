import { Routes } from '@angular/router';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';

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
];
