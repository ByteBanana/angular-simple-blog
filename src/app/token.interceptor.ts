import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { threadId } from 'worker_threads';
import { AuthenticationResponse } from './auth/login/login-response.payload';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("logout")
    if (this.urlIsLoginOrRefreshToken(request) || request.method === 'GET') {
      return next.handle(request);
    }
    const jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      request = this.addJwtTokenToRequestHeader(request, jwtToken);
      return next.handle(request).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status == 401) {
            return this.handleAuthErrors(request, next);
          } else {
            return throwError(error);
          }
        })
      );
    }
  }

  private handleAuthErrors(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse) => {
          this.isRefreshingToken = false;
          this.refreshTokenSubject.next(refreshTokenResponse.body.token);
          return next.handle(
            this.addJwtTokenToRequestHeader(
              req,
              refreshTokenResponse.body.token
            )
          );
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((result) => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(
            this.addJwtTokenToRequestHeader(req, this.authService.getJwtToken())
          );
        })
      );
    }
  }

  private urlIsLoginOrRefreshToken(request: HttpRequest<any>): boolean {
    return (
      request.url.indexOf('refresh') !== -1 ||
      request.url.indexOf('login') !== -1
    );
  }

  addJwtTokenToRequestHeader(req: HttpRequest<any>, jwtToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + jwtToken),
    });
  }
}
