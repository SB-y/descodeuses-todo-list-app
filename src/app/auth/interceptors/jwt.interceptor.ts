// JwtInterceptor ajoute automatiquement le token JWT dans les headers Authorization de chaque requête HTTP sortante.

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // 1. Ignorer les requêtes OPTIONS (préflight)
    if (req.method === 'OPTIONS') {
      return next.handle(req);
    }

    // 2. Ignorer totalement la route de LOGIN
    if (req.url.includes('/auth/login')) {
      return next.handle(req);
    }

    // 3. Récupère le token
    const token = localStorage.getItem('token');

    // 4. Pas de token ? → ne rien ajouter
    if (!token) {
      return next.handle(req);
    }

    // 5. Injecte le token correctement
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(cloned);
  }
}

