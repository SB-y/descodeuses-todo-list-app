import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../models/userlist.model';

@Injectable({
  providedIn: 'root'
})



// API virtuelle mock
// inMemory cad données initialisées à chaque démarrage

//prerequis en terminal:
//npm i angular-in-memory-web-api@0.19.0
//ng g service in-memory-data

export class InMemoryDataService implements InMemoryDbService {

  constructor() { }


  createDb() {
    const todos: Todo[] = [
      // Tache urgente
      { id: 1, textarea:null, title: "Appeler sécu", completed: null, priorite: 1, dueDate: new Date().toISOString()},

      // Tache en retard
      { id: 2, textarea: null, title: "Envoyer email", completed: null, priorite: 0, dueDate: new Date(2025,5,1).toISOString() },

      //Tache en retard
      { id: 3, textarea:null, title: "Déclarer impots", completed: null, priorite: 0, dueDate: new Date(2025,5,2).toISOString()},

      //Tache aujourd'hui
      { id: 4, textarea: null, title: "Envoyer cv", completed: null, priorite: 0, dueDate: new Date().toISOString() },

      // Tache aujourd'hu
      { id: 5, textarea:null, title: "Envoyer courrier", completed: null, priorite: 0, dueDate: new Date().toISOString()},

      //Tache urgente
      { id: 6, textarea: null, title: "Prendre rdv", completed: null, priorite: 0, dueDate: new Date().toISOString() },
    ]

    const users: User[] = [
      { id: 1, prenom: "adel", nom: "bh", sexe: "homme" },
      { id: 2, prenom: "sarah", nom: "bh", sexe:"femme" }
    ]

    return { todos, users } // un lien endpoint api/todos 

  }


   // Cette méthode est appelée si le client fournit id: null
   genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(t => t.id!)) + 1 : 1;
  }

}
