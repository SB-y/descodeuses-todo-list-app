import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

//commande pour creer le fichier:
//ng g service todo

//Le service fait le lien entre le front et le back

//Il fait les operations CRUD: Create, Read, Update, Delete

@Injectable({ // Permet à Angular d’injecter ce service dans d'autres classes
  providedIn: 'root'
})




export class TodoService {

  private apiURL = "api/todos"; 

   // HttpClient pour communiquer avec le API backend
  
   constructor(private http:HttpClient) {} // Injection du service HttpClient dans le constructeur. Cela permet d’utiliser les méthodes comme .get(), .post(), .put(), etc.

// create
addTodo(item : Todo) {
  return this.http.post<Todo>(this.apiURL, item);
}

// Read
// fetch liste
getTodos() {
  //HTTP GET sans 2eme parametre parce que il y a pas de body
  return this.http.get<Todo[]>(this.apiURL);
}

// Read
// fetch un item de todo
getTodo(id:number) {
return this.http.get<Todo>(this.apiURL+"/"+id );
}

// Update
updateTodo(item:Todo) {
  return this.http.put<Todo>(this.apiURL +'/'+ item.id, item);
}

// Delete
deleteTodo(id:number) {
  return this.http.delete(this.apiURL +'/'+ id);
}

}
