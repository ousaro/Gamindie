import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full', // ensures that the redirect only triggers when the full path is empty
    },
    {
        path: 'login',
        component: LoginComponent,

    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'activate-account',
        component: ActivateAccountComponent
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.routes').then(m => m.HOME_ROUTES)

    }
];
