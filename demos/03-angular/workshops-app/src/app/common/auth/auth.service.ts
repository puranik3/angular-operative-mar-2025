import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { BehaviorSubject, map, tap } from 'rxjs';

export interface ICredentials {
  email: string;
  password: string;
}

export interface ILoginResponse {
  email: string;
  authToken: string;
  role: 'admin' | 'general';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static KEY_USER = 'user';

  apiUrl = environment.apiUrl;

  // Add this...
  // do not expose the behavior subject - else anyone can emit values using it
  private isLoggedInSubject = new BehaviorSubject(this.isLoggedIn());

  // convert it to an observable and expose it to consumers (like the navigation menu)
  public loggedInStatus$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: ICredentials) {
    return this.http
      .post<ILoginResponse>(`${this.apiUrl}/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((resp) => {
          // login successful if there's a jwt token in the response
          // NOTE: Here it is assumed the response has the token in `authToken`. Check if that is the case. Else replace `authToken` with the correct token field name from response
          if (resp && resp.authToken) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(AuthService.KEY_USER, JSON.stringify(resp));
          }

          // return resp;
        }),
        tap(
          () => this.isLoggedInSubject.next(true)
        )
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(AuthService.KEY_USER);

    // Add this to fire an event on the exposed observable when the user logs out
    this.isLoggedInSubject.next(false);
  }


  getUser() {
    return JSON.parse(localStorage.getItem(AuthService.KEY_USER) || '{}');
  }

  isLoggedIn() {
    return !!localStorage.getItem(AuthService.KEY_USER);
  }
}
