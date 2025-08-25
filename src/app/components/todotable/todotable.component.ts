import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';


@Component({
  selector: 'app-todotable',
  standalone: false,
  templateUrl: './todotable.component.html',
  styleUrl: './todotable.component.css'
})




export class TodotableComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoService: TodoService) {
  };

  ngOnInit(): void {
    this.fetchTodo();
  }



  fetchTodo() {
    //Communication asynchrone donc il faut s'inscrire pour avoir le retour
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }



  getTodoEtat(todo: Todo): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(todo.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (todo.completed) {
      return 'Effectuée';
    }

    // En retard
    if (dueDate < today) {
      return 'En retard';
    }

    // A faire aujourd'hui
    if (dueDate.getTime() === today.getTime()) {
      return 'À faire auj.';
    }

    // Urgent : priorité >= 2 et échéance future ou aujourd'hui
    if (todo.priorite != null && todo.priorite >= 2 && dueDate >= today) {
      return 'Urgent';
    }

    return 'À venir';
  }




  // Fontion pour la class du texte de l'état en fonction de getTodoEtat()
  getTodoEtatClass(todo: Todo): string {
    switch (this.getTodoEtat(todo)) {
      case 'En retard':
        return 'bg-yellow-600 text-white text-xs px-2 py-1 rounded';
      case 'À faire auj.':
        return 'bg-cyan-600 text-white text-xs px-2 py-1 rounded';
      case 'Urgent':
        return 'bg-pink-600 text-white text-xs px-2 py-1 rounded';
      case 'Effectuée':
        return 'bg-lime-600 text-white text-xs px-2 py-1 rounded';
      default:
        return 'bg-gray-400 text-white text-xs px-2 py-1 rounded';
    }
  }



  getOrdreTodos(): Todo[] {
    const ordrePriorite: Record<string, number> = { //Record<string, number> dit à TypeScript que toutes les chaînes sont acceptables comme clés.
      'Urgent': 1,
      'À faire auj.': 2,
      'En retard': 3,
      'À venir': 4,
      'Effectuée': 5
    };

    return [...this.todos].sort((a, b) => {
      const etatA = this.getTodoEtat(a);
      const etatB = this.getTodoEtat(b);
      return (ordrePriorite[etatA] ?? 99) - (ordrePriorite[etatB] ?? 99);
      //Si priorityOrder[stateA] existe et n’est pas null ou undefined → on utilise cette valeur.
      //Sinon :on prend 99 par défaut
      //Valeur très haute pour les états inconnus, pour qu’ils soient triés à la fin.
    });
  }

}
