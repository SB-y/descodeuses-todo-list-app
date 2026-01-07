import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../models/user.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})



export class UserService {

  private apiURL = environment.apiUrl + '/api/utilisateur';

  constructor(private http: HttpClient) {}

  /** REGISTER - création d'un utilisateur */
  addUtilisateur(utilisateur: Utilisateur) {
    return this.http.post(`${environment.apiUrl}/auth/register`, utilisateur);
  }

  /** READ - liste des utilisateurs */
  getUtilisateurs() {
    return this.http.get<Utilisateur[]>(this.apiURL);
  }

  /** READ - récupère un utilisateur par son id */
  getUtilisateur(id: number) {
    return this.http.get<Utilisateur>(`${this.apiURL}/${id}`);
  }

  /** UPDATE - met à jour un utilisateur */
  updateUtilisateur(item: Utilisateur) {
    return this.http.put<Utilisateur>(`${this.apiURL}/${item.id}`, item);
  }

  /** Récupérer le profil de l'utilisateur connecté = 
   * Cet endpoint lit le token JWT envoyé automatiquement dans l’en-tête Authorization.
   * Le backend décode le token → trouve l’ID du user → va chercher son profil → renvoie un Utilisateur complet.*/
  getUtilisateurConnecte() {
    return this.http.get<Utilisateur>(`${this.apiURL}/monprofil`);
  }

  /** Récupération locale du user stocké (si utile côté front) */
  getCurrentUser(): Utilisateur | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /** DELETE - supprime un utilisateur */
  deleteUtilisateur(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
