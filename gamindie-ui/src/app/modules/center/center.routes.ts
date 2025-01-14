import { Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { CreateComponent } from './create/create.component';
import { MyfeedComponent } from './myfeed/myfeed.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedPostComponent } from './saved-post/saved-post.component';
import { StoreComponent } from './store/store.component';


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
];
