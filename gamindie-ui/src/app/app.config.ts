import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JsonContentTypeInterceptor } from './shared/interceptors/json-content-type.interceptor';
import { httpTokenInterceptor } from './shared/interceptors/http-token.interceptor';
import { DarkModeService } from './core/services/theme/dark-mode.service';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { AuthContext } from './shared/contexts/auth-context';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([JsonContentTypeInterceptor,httpTokenInterceptor])),
    provideAngularSvgIcon(),
    DarkModeService,
    AuthContext,

  ]
};
