import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', // ensures that the redirect only triggers when the full path is empty
  },
  // Auth modules
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  // App with named outlets
  {
    path: 'home',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/home/(primary:center//secondary:right)',
        pathMatch: 'full', // ensures that the redirect only triggers when the full path is empty
      },
      // Named outlet routes
      {
        path: 'center',
        outlet: 'primary',
        loadChildren: () =>
          import('./modules/center/center.routes').then((m) => m.CENTER_ROUTES),
      },
      {
        path: 'right',
        outlet: 'secondary',
        loadChildren: () =>
          import('./modules/right/right.routes').then((m) => m.RIGHT_ROUTES),
      },
    ],
  },

  // Unknown path
  {
    path: '**',
    redirectTo: 'home',
  },
];
