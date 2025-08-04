import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})




export class ContactService {



  //private apiURL = "http://localhost:8080/api/contact"; //avt sans lien backend "api/todos"
  private apiURL = environment.apiUrl+ '/api/contact';

  // HttpClient pour communiquer avec le API backend

  constructor(private http: HttpClient) { } // Injection du service HttpClient dans le constructeur. Cela permet d’utiliser les méthodes comme .get(), .post(), .put(), etc.

  // create
  addContact(item: Contact) {
    return this.http.post<Contact>(this.apiURL, item);
  }

  // Read
  // fetch liste
  getContacts() {
    //HTTP GET sans 2eme parametre parce que il y a pas de body
    return this.http.get<Contact[]>(this.apiURL);
  }

  // Read
  // fetch un item de todo
  getContact(id: number) {
    return this.http.get<Contact>(this.apiURL + "/" + id);
  }

  // Update
  updateContact(item: Contact) {
    return this.http.put<Contact>(this.apiURL + '/' + item.id, item);
  }

  // Delete
  deleteConact(id: number) {
    return this.http.delete(this.apiURL + '/' + id);
  }
}