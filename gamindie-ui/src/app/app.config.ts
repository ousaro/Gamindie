import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JsonContentTypeInterceptor } from './services/interceptors/json-content-type.interceptor';
import { httpTokenInterceptor } from './services/interceptors/http-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([JsonContentTypeInterceptor,httpTokenInterceptor])),
  ]
};
