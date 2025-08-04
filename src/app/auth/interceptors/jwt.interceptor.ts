// JwtInterceptor ajoute automatiquement le token JWT dans les headers Authorization de chaque requête HTTP sortante.

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable() // Injectable pour pouvoir l'utiliser dans le système d'injection Angular
export class JwtInterceptor implements HttpInterceptor {

  // Cette méthode est appelée à chaque requête HTTP sortante
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupère le token JWT stocké dans localStorage
    // (on pourrait aussi le récupérer via un service d'authentification)
    const token = localStorage.getItem('token');

    // Log du token dans la console pour aider au debug (à supprimer en prod)
    console.log('Token utilisé dans le header:', token);

    // Si un token est présent, on clone la requête pour y ajouter le header Authorization
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Ajoute le token dans l'entête Authorization
        }
      });
    }

    // Passe la requête modifiée (ou non) au prochain handler dans la chaîne
    return next.handle(request);
  }
}



/*

Version prof :

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('authToken');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};*/