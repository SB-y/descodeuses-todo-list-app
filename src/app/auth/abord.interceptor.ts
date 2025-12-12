import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable()
export class AbortInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(

      catchError((err: HttpErrorResponse) => {

        /**
         * IGNORER les erreurs "abort"
         * Cas d'une page qui recharge ou que l'utilisateur navigue vite.
         */
        if (err.status === 0 && err.error?.type === 'abort') {
          console.warn("⏳ Requête annulée (abort): ignorée automatiquement");
          return of(); // ❗ très important : ne renvoie rien, mais ne déclenche pas d’erreur
        }

        /**
         * Pour toute autre erreur → on la laisse remonter normalement
         */
        return throwError(() => err);
      })

    );
  }
}
