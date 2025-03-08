import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { routes as workshopsRoutes } from './workshops/workshops.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    // order of routes matters - router tries the routes one-by-one till it finds a match
    provideRouter(workshopsRoutes),
    provideRouter(routes),
  ],
};
