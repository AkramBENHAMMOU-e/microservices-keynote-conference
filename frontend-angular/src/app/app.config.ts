import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import {
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  createInterceptorCondition,
  includeBearerTokenInterceptor,
  provideKeycloak
} from 'keycloak-angular';

const apiBearerCondition = createInterceptorCondition({
  urlPattern: /^http:\/\/localhost:808[1-2](\/.*)?$/i,
  bearerPrefix: 'Bearer'
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloak({
      config: {
        url: 'http://localhost:8080',
        realm: 'sdia-real',
        clientId: 'conf-keynote-angular'
      },
      initOptions: {
        // Older Keycloak versions do not expose /3p-cookies/*, so skip the iframe check.
        onLoad: 'login-required',
        checkLoginIframe: false
      }
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [apiBearerCondition]
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor]))
  ]
};
