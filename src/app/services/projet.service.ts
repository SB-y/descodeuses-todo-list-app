import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Projet } from '../models/projet.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})


export class ProjetService {

  private apiURL = environment.apiUrl + '/api/projet';

  constructor(private http: HttpClient) {}

  // CREATE
  addProjet(item: Projet) {
    return this.http.post<Projet>(this.apiURL, item);
  }

  // READ ALL
  getProjets() {
    return this.http.get<Projet[]>(this.apiURL);
  }

  // READ BY ID
  getProjet(id: number) {
    return this.http.get<Projet>(`${this.apiURL}/${id}`);
  }

  // UPDATE
  updateProjet(item: Projet) {
    return this.http.put<Projet>(`${this.apiURL}/${item.id}`, item);
  }

  // DELETE
  deleteProjet(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
