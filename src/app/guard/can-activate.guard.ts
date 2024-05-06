import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const loginservice = inject(AuthService)

  if (loginservice.isAuthentication()) {
    return true
  } else {
    router.navigateByUrl('/login')
    return false
  } 
};
