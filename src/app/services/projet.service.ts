import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Projet } from '../models/projet.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  //private apiURL = "http://localhost:8080/api/projet";
  private apiURL = environment.apiUrl+ '/api/projet';

  // HttpClient pour communiquer avec le API backend

  constructor(private http: HttpClient) { } // Injection du service HttpClient dans le constructeur. Cela permet d’utiliser les méthodes comme .get(), .post(), .put(), etc.


  // Méthode utilitaire pour générer les headers avec le token JWT
  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Assure-toi que le token est bien stocké ici
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  // create
  addProjet(item: Projet) {
    return this.http.post<Projet>(this.apiURL, item, {
      headers: this.getAuthHeaders()
    });
  }

  // Read
  // fetch liste
  getProjets() {
    //HTTP GET sans 2eme parametre parce que il y a pas de body
    return this.http.get<Projet[]>(this.apiURL, {
      headers: this.getAuthHeaders()
    });
  }

  // Read
  // fetch un item de todo
  getProjet(id: number) {
    return this.http.get<Projet>(this.apiURL + "/" + id, {
      headers: this.getAuthHeaders()
    });
  }

  // Update
  updateProjet(item: Projet) {
    return this.http.put<Projet>(this.apiURL + '/' + item.id, item, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete
  deleteProjet(id: number) {
    return this.http.delete(this.apiURL + '/' + id, {
      headers: this.getAuthHeaders()
    });
  }

}