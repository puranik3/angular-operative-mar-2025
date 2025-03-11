To enable **automatic logout when the token expires** and **revalidate the user**, you can use an **HTTP interceptor** to detect token expiration and a **refresh token mechanism** to reauthenticate the user without manual login.

---

## **Solution Approach**
1. **Intercept API Requests**  
   - Attach the token to all outgoing requests.
   - If the token is expired, attempt to refresh it.

2. **Handle Expired Tokens**
   - If a **401 Unauthorized** response is received, check if the token is expired.
   - Attempt to refresh the token using a refresh token.
   - If the refresh token fails, **logout the user automatically**.

3. **Use a Token Refresh Service**  
   - Maintain logic for refreshing tokens.
   - Store and manage tokens in localStorage or sessionStorage.

---

## **Implementation Steps**

### **1. Create an Auth Service for Token Management**
This service will handle retrieving, storing, and refreshing the token.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) {}

  get accessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  get refreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  refreshAccessToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return this.refreshTokenSubject.asObservable();
    }

    this.refreshTokenInProgress = true;

    return this.http.post('/api/auth/refresh', { refreshToken: this.refreshToken }).pipe(
      tap((res: any) => {
        this.setTokens(res.accessToken, res.refreshToken);
        this.refreshTokenSubject.next(res.accessToken);
        this.refreshTokenInProgress = false;
      }),
      catchError((error) => {
        this.clearTokens();
        return throwError(() => error);
      })
    );
  }
}
```

---

### **2. Create an Interceptor to Detect Expired Tokens**
This interceptor:
- Attaches the **Authorization header**.
- Detects **401 errors** (Unauthorized).
- Refreshes the token if it's expired.
- Logs the user out if the refresh token fails.

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.accessToken;
    let request = req;

    if (accessToken) {
      request = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Try to refresh the token
          return this.authService.refreshAccessToken().pipe(
            switchMap((newToken: string) => {
              // Retry the original request with new token
              const clonedRequest = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              return next.handle(clonedRequest);
            }),
            catchError(() => {
              // If refresh fails, force logout
              this.authService.clearTokens();
              return throwError(() => error);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
```

---

### **3. Register the Interceptor in `providers`**
In `app.module.ts`, add the interceptor to the `HTTP_INTERCEPTORS` token.

```typescript
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppModule {}
```

---

## **How It Works**
1. **User logs in** → The app stores `accessToken` and `refreshToken`.
2. **Each API request** → The `AuthInterceptor` attaches the `accessToken` in the request.
3. **If token is expired (401 Unauthorized)**:
   - The interceptor calls `refreshAccessToken()`.
   - If refresh succeeds → new token is used to retry the request.
   - If refresh fails → **user is logged out automatically**.

---

## **Bonus: Automatically Logout When Token Expires**
You can track **token expiration time** and logout the user automatically.

### **Modify `AuthService` to Handle Token Expiry**
```typescript
setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);

  // Decode token to get expiration time
  const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
  const expiresIn = tokenPayload.exp * 1000 - Date.now(); // Convert to milliseconds

  // Auto logout when token expires
  if (this.tokenExpirationTimer) {
    clearTimeout(this.tokenExpirationTimer);
  }
  this.tokenExpirationTimer = setTimeout(() => {
    this.clearTokens();
  }, expiresIn);
}
```

---

## **Conclusion**
✅ **Automatic Logout** when refresh token expires.  
✅ **Reauthentication** by refreshing the token when needed.  
✅ **Intercepting Requests** to attach valid tokens.  
✅ **Handles Expired Tokens Gracefully** without manual user intervention.  

Would you like an example of how to integrate this with a UI (Angular Guard or Toast Notification)? 🚀