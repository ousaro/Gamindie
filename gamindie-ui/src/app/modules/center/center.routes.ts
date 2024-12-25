import { Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';


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
];
