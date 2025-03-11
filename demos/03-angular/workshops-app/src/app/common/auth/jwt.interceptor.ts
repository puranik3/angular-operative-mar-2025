import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let user = this.authenticationService.getUser();

    // NOTE: Here it is assumed the response has the token in `authToken`. Check if that is the case. Else replace `authToken` with the correct token field name from response
    // Also check if backend accepts Authorization as `Bearer <token>` or simply `token`
    if (user && user.authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.authToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
