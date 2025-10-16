import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('auth_token');

    if (authToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      });
    }

    return next
      .handle(req)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    // 401 Unauthorized -> Redirect to login
    if (error.status === 401) {
      console.error('401 Unauthorized - Redirecting to login');
      this.router.navigate(['/auth/login']);
    }
    return throwError(() => error);
  }
}
