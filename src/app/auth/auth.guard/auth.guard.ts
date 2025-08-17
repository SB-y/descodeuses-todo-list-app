//authGuard (CanActivateFn) → Bloque l’accès aux routes si l’utilisateur n’est pas connecté 
// (vérifie sessionStorage). Redirige vers /login sinon. C’est un guard fonctionnel moderne avec inject().


import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);


  if(sessionStorage.getItem("isLoggedIn")) {
  return true;
} else {
  return router.createUrlTree(["/login"]);
}
};
