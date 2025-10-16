import { routes } from './app.routes';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { AuthServiceFE } from './services/auth.service';
import { UserRole } from '../../fastapi';
import { AuthGuard } from './guards/auth.guard';
import { OpenAPI } from '../../fastapi';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

OpenAPI.BASE = environment.apiUrl;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: 'guardPreGuest',
      useFactory: (authService: AuthServiceFE, router: Router) =>
        new AuthGuard(
          [UserRole.PREGUEST, UserRole.GUEST, UserRole.ADMIN, UserRole.OWNER],
          authService,
          router
        ),
      deps: [AuthServiceFE, Router],
    },
    {
      provide: 'guardGuest',
      useFactory: (authService: AuthServiceFE, router: Router) =>
        new AuthGuard(
          [UserRole.GUEST, UserRole.ADMIN, UserRole.OWNER],
          authService,
          router
        ),
      deps: [AuthServiceFE, Router],
    },
    {
      provide: 'guardAdmin',
      useFactory: (authService: AuthServiceFE, router: Router) =>
        new AuthGuard([UserRole.ADMIN, UserRole.OWNER], authService, router),
      deps: [AuthServiceFE, Router],
    },
    {
      provide: 'guardOwner',
      useFactory: (authService: AuthServiceFE, router: Router) =>
        new AuthGuard([UserRole.OWNER], authService, router),
      deps: [AuthServiceFE, Router],
    },
  ],
};
