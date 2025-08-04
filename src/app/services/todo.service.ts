import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { environment } from '../../environments/environment';


//commande pour creer le fichier:
//ng g service todo

//Le service fait le lien entre le front et le back

//Il fait les operations CRUD: Create, Read, Update, Delete

@Injectable({ // Permet à Angular d’injecter ce service dans d'autres classes
  providedIn: 'root' // Singleton accessible dans toute l'application
})
export class TodoService {

  // URL de base de l'API backend pour gérer les todos
  //private apiURL = "http://localhost:8080/api/action"; // auparavant "api/todos"
  private apiURL = environment.apiUrl+ '/api/action';

  // Injection de HttpClient pour communiquer avec l'API backend
  constructor(private http: HttpClient) { }

  // Fonction utilitaire pour ajouter les headers HTTP avec le token JWT
  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Récupère le token JWT stocké localement
    console.log("Token utilisé dans le header:", token); // Log pour debug
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajoute le token dans le header Authorization
    });
  }

  // CREATE : Ajoute un nouvel élément Todo via une requête POST
  addTodo(item: Todo) {
    return this.http.post<Todo>(this.apiURL, item, {
      headers: this.getAuthHeaders() // Ajout du header Authorization avec token
    });
  }

  // READ : Récupère la liste complète des todos via une requête GET
  getTodos() {
    // Pas de corps (body) dans un GET, donc pas de deuxième paramètre autre que headers
    return this.http.get<Todo[]>(this.apiURL, {
      headers: this.getAuthHeaders()
    });
  }

  // READ : Récupère un todo spécifique par son ID via GET
  getTodo(id: number) {
    return this.http.get<Todo>(this.apiURL + "/" + id, {
      headers: this.getAuthHeaders()
    });
  }

  // UPDATE : Met à jour un todo existant via une requête PUT
  updateTodo(item: Todo) {
    return this.http.put<Todo>(this.apiURL + '/' + item.id, item, {
      headers: this.getAuthHeaders()
    });
  }

  // DELETE : Supprime un todo par son ID via une requête DELETE
  deleteTodo(id: number) {
    return this.http.delete(this.apiURL + '/' + id, {
      headers: this.getAuthHeaders()
    });
  }

}
