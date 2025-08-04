// AuthenService gère la connexion, la déconnexion, et la gestion du token JWT pour l’authentification utilisateur.

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Permet d'injecter ce service dans toute l'application (singleton)
})
export class AuthenService {

  // URL de l'API pour la connexion
  private apiUrl = 'http://localhost:8080/auth/login';

  // Injection du HttpClient pour faire des requêtes HTTP
  constructor(private http: HttpClient) {}

  // Méthode pour se connecter : envoie les identifiants au backend et reçoit un token
  login(credentials: { username: string, password: string }): Observable<{ token: string }> {
    // POST vers l'API avec les credentials, attend un objet avec un champ 'token' en réponse
    return this.http.post<{ token: string }>(this.apiUrl, credentials);
  }

  // Méthode pour se déconnecter : supprime le token et l'état de connexion stockés localement
  logout() {
    localStorage.removeItem('token');      // Supprime le token JWT du localStorage
    sessionStorage.removeItem('isLoggedIn'); // Supprime un éventuel indicateur de session
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


/*

Version prof :

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/auth/login';

  constructor(private http: HttpClient) {}

  login(payload : any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, payload);
  }
}*/