import { Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { CreateComponent } from './create/create.component';
import { MyfeedComponent } from './myfeed/myfeed.component';


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
  }
];
