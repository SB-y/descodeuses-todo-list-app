// AuthenService gère la connexion, la déconnexion, et la gestion du token JWT pour l’authentification utilisateur.
//Service singleton qui gère la connexion, la déconnexion, le stockage du token JWT, et fournit des méthodes pour vérifier le rôle de l’utilisateur 
// (isAdmin, isUser) ou savoir s’il est connecté (isLoggedIn).


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'   // Le service est un singleton global dans toute l'application
})
export class AuthenService {

  // URL complète pour l'API de login (exemple : https://monapi.com/auth/login)
  private apiURL = environment.apiUrl + '/auth/login';

  // Variables internes pour garder l'état d'authentification
  private token: string | null = null; // Contiendra le JWT
  private role: string | null = null;  // Contiendra "ROLE_ADMIN" ou "ROLE_USER"

  constructor(private http: HttpClient) {

    // Dès le démarrage du service, on tente de restaurer la session
    // Cela évite que l'utilisateur soit "déconnecté" après un F5 ou une URL collée manuellement
    this.restoreSession();
  }

  /**
   * LOGIN
   * Envoie username + password au backend et reçoit un JWT + role.
   * En cas de succès → on stocke tout dans localStorage.
   */
  login(credentials: { username: string, password: string }): 
    Observable<{ token: string, role: string }> {
    
    return new Observable(observer => {

      this.http.post<{ token: string, role: string }>(this.apiURL, credentials)
        .subscribe({
          next: (response) => {

            // ✔ Stocke les valeurs dans localStorage (persistance)
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);

            // ✔ Met à jour l'état interne du service
            this.token = response.token;
            this.role = response.role;

            observer.next(response);
            observer.complete();
          },
          error: (err) => observer.error(err)
        });
    });
  }

  /**
   * LOGOUT
   * Supprime tout ce qui concerne l'authentification.
   * Il suffit d'effacer le token et le rôle → l'utilisateur est "déconnecté".
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    this.token = null;
    this.role = null;
  }

  /**
   * RESTORE SESSION
   * Appelé automatiquement au démarrage.
   * Permet de garder l'utilisateur connecté après un F5 ou s'il colle une URL.
   */
  restoreSession() {
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');

    // Si un token existe dans localStorage → on restaure la session
    if (savedToken) {
      this.token = savedToken;
      this.role = savedRole;
      console.log('Session restaurée. Rôle:', this.role);
    }
  }

  /**
   * Vérifie si l'utilisateur est ADMIN
   */
  isAdmin(): boolean {
    return this.role === 'ROLE_ADMIN';
  }

  /**
   * Vérifie si l'utilisateur est USER
   */
  isUser(): boolean {
    return this.role === 'ROLE_USER';
  }

  /**
   * Vérifie si l'utilisateur est connecté
   * (basé sur l'état interne restauré automatiquement)
   */
  isLoggedIn(): boolean {
    return this.token != null;
  }

  /**
   *Récupère le token JWT pour l'attacher aux requêtes HTTP
   */
  getToken(): string | null {
    return this.token;
  }
}



/*
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root' // Permet d'injecter ce service dans toute l'application (singleton)
})
export class AuthenService {

  // URL de l'API pour la connexion
  //private apiUrl = 'http://localhost:8080/auth/login';
    private apiURL = environment.apiUrl+ '/auth/login';

  // Injection du HttpClient pour faire des requêtes HTTP
  constructor(private http: HttpClient) {}

  // Méthode pour se connecter : envoie les identifiants au backend et reçoit un token
  login(credentials: { username: string, password: string }): Observable<{ token: string, role: string }> {
    // POST vers l'API avec les credentials, attend un objet avec un champ 'token' en réponse
    return this.http.post<{ token: string, role: string }>(this.apiURL, credentials);
  }

  // Méthode pour se déconnecter : supprime le token et l'état de connexion stockés localement
  logout() {
    localStorage.removeItem('token');      // Supprime le token JWT du localStorage
    sessionStorage.removeItem('isLoggedIn'); // Supprime un éventuel indicateur de session
    localStorage.removeItem('role');
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    console.log('Role détecté :', role);
    return role === 'ROLE_ADMIN';
  }

  isUser(): boolean {
    const role = localStorage.getItem('role');
    console.log('Role détecté :', role);
    return localStorage.getItem('role') === 'ROLE_USER';
  }

  // Vérifie si l'utilisateur est connecté en testant la présence du token dans le localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Retourne true si token existe, sinon false
  }

  // Récupère le token JWT stocké dans le localStorage (ou null si inexistant)
  getToken(): string | null {
    return localStorage.getItem('token');
  }

}

*/