import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


//commande pour creer le fichier:
//ng g service todo

//Le service fait le lien entre le front et le back

//Il fait les operations CRUD: Create, Read, Update, Delete

@Injectable({ // Permet à Angular d’injecter ce service dans d'autres classes
  providedIn: 'root' // Singleton accessible dans toute l'application
})





export class TodoService {

  private apiURL = environment.apiUrl + '/api/action';

  constructor(private http: HttpClient) {}

  // CREATE
  addTodo(item: Todo) {
    return this.http.post<Todo>(this.apiURL, item);
  }

  // READ ALL
  getTodos() {
    return this.http.get<Todo[]>(this.apiURL);
  }

  // READ ONE
  getTodo(id: number) {
    return this.http.get<Todo>(`${this.apiURL}/${id}`);
  }

  // UPDATE
  updateTodo(item: Todo) {
    return this.http.put<Todo>(`${this.apiURL}/${item.id}`, item);
  }

  // DELETE
  deleteTodo(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  // SEARCH (filtrage côté front)
  searchTodos(term: string) {
    return this.getTodos();
  }

  // Tâches assignées à l'utilisateur connecté
  getAssignedToMe(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiURL}/assigned-to-me`);
  }
}
