import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route,
  state
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const currentUser = inject(AuthService).isLogin();

  //  Grants or deny access to this route
  const isLogged = currentUser ? true : false;

  //  Redirects to another route
  if (!isLogged) {
    return inject(Router).createUrlTree(['/', 'login']);
  }

  return isLogged;
};
