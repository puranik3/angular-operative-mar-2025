import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authenticationService = inject(AuthService);

  if (!authenticationService.isLoggedIn()) {
    router.navigateByUrl('/login');
    return false;
  } else {
    return true;
  }
};
