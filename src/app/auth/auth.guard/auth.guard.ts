//authGuard (CanActivateFn) → Bloque l’accès aux routes si l’utilisateur n’est pas connecté 
// (vérifie sessionStorage). Redirige vers /login sinon. C’est un guard fonctionnel moderne avec inject().


import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenService } from '../auth.guard/authen.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const auth = inject(AuthenService);

  if (auth.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(["/login"]);
};
