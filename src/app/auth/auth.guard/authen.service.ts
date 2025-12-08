// AuthenService gère la connexion, la déconnexion, et la gestion du token JWT pour l’authentification utilisateur.
//Service singleton qui gère la connexion, la déconnexion, le stockage du token JWT, et fournit des méthodes pour vérifier le rôle de l’utilisateur 
// (isAdmin, isUser) ou savoir s’il est connecté (isLoggedIn).


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
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
  login(credentials: { username: string, password: string }) {
    return this.http.post<{ token: string, role: string }>(this.apiURL, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
  
        this.token = response.token;
        this.role = response.role;
      })
    );
  }
  

  /**
   * LOGOUT
   * Supprime tout ce qui concerne l'authentification.
   * Efface le token et le rôle → l'utilisateur est "déconnecté".
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
