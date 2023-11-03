import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const loginStatus = inject(AuthService).isLogin();

  //  Grants or deny access to this route
  const isLogged = loginStatus ? true : false;

  //  Redirects to another route
  if (!isLogged) {
    return inject(Router).createUrlTree(['/', 'login']);
  }

  return isLogged;
};
