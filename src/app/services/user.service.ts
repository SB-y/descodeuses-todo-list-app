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

  /** Récupérer le profil de l'utilisateur connecté */
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



/*
export class UserService {

  //private apiURL = "http://localhost:8080/api/utilisateur";
  private apiURL = environment.apiUrl + '/api/utilisateur';

  constructor(private http: HttpClient) { }

  // Fonction utilitaire pour ajouter les headers HTTP avec le token JWT
  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Récupère le token JWT stocké localement
    console.log("Token utilisé dans le header:", token); // Log pour debug
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajoute le token dans le header Authorization
    });
  }


  // Dans user.service.ts
  addUtilisateur(utilisateur: Utilisateur) {
    //return this.http.post("http://localhost:8080/auth/register", utilisateur);
    return this.http.post(`${environment.apiUrl}/auth/register`, utilisateur);
  }

  // Read
  // fetch liste
  getUtilisateurs() {
    //HTTP GET sans 2eme parametre parce que il y a pas de body
    return this.http.get<Utilisateur[]>(this.apiURL, {
      headers: this.getAuthHeaders() // Ajout du header Authorization avec token
    });
  }

  // Read
  // fetch un item de todo
  getUtilisateur(id: number) {
    return this.http.get<Utilisateur>(this.apiURL + "/" + id, {
      headers: this.getAuthHeaders() // Ajout du header Authorization avec token
    });
  }

  // Update
  updateUtilisateur(item: Utilisateur) {
    return this.http.put<Utilisateur>(this.apiURL + '/' + item.id, item, {
      headers: this.getAuthHeaders() // Ajout du header Authorization avec token
    });
  }

  getUtilisateurConnecte() {
    return this.http.get<Utilisateur>(this.apiURL + '/monprofil', {
      headers: this.getAuthHeaders()
    });
  }

  getCurrentUser(): Utilisateur | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  

  // Delete
  deleteUtilisateur(id: number) {
    return this.http.delete(this.apiURL + '/' + id, {
      headers: this.getAuthHeaders(), // Ajout du header Authorization avec token
    });
  }



}

*/