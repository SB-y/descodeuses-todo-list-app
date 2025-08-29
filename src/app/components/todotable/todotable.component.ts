import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';


@Component({
  selector: 'app-todotable',                       // sélecteur du composant dans le template parent
  standalone: false,                               // composant déclaré dans un module Angular
  templateUrl: './todotable.component.html',       // vue associée
  styleUrl: './todotable.component.css'            // style associé
})



export class TodotableComponent implements OnInit {

  todos: Todo[] = []; // tableau de todos qui sera rempli via le service

  constructor(private todoService: TodoService) {  // injection du service TodoService pour récupérer les données
  };

  ngOnInit(): void {
    this.fetchTodo(); // au chargement du composant, on récupère les todos
  }



  fetchTodo() {
    // Communication asynchrone donc il faut s'inscrire pour avoir le retour
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data; // mise à jour de la liste locale avec les données reçues
    });
  }



  getTodoEtat(todo: Todo): string {
    // Détermination de l'état d'une tâche en fonction de son avancement, date limite et priorité
    if (todo.completed) {
      return 'Effectuée'; // si cochée
    }

    if (!todo.dueDate) {
      return 'Flexible'; // pas de date → tâche flexible
    }

    // Création de deux dates "nettoyées" (sans heures/minutes) pour comparer les jours uniquement
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(todo.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    // En retard
    if (dueDate < today) {
      return 'En retard';
    }

    // À faire aujourd'hui
    if (dueDate.getTime() === today.getTime()) {
      return 'À faire auj.';
    }

    // Urgent : priorité >= 2 et échéance future ou aujourd'hui
    if (todo.priorite != null && todo.priorite >= 2 && dueDate >= today) {
      return 'Urgent';
    }

    return 'À venir'; // cas par défaut : date future non urgente
  }

  getTodoEtatClass(todo: Todo): string {
    // Retourne une chaîne de classes CSS Tailwind en fonction de l'état
    switch (this.getTodoEtat(todo)) {
      case 'En retard':
        return 'bg-yellow-600 text-white text-xs px-2 py-1 rounded';
      case 'À faire auj.':
        return 'bg-cyan-600 text-white text-xs px-2 py-1 rounded';
      case 'Urgent':
        return 'bg-pink-600 text-white text-xs px-2 py-1 rounded';
      case 'Effectuée':
        return 'bg-lime-600 text-white text-xs px-2 py-1 rounded';
      case 'Flexible':
        return 'bg-gray-500 text-white text-xs px-2 py-1 rounded';
      default:
        return 'bg-gray-400 text-white text-xs px-2 py-1 rounded'; // fallback si état inconnu
    }
  }



  getOrdreTodos(): Todo[] {
    // Définition d’un ordre de priorité numérique par état
    const ordrePriorite: Record<string, number> = { // Record<string, number> dit à TypeScript que toutes les chaînes sont acceptables comme clés.
      'Urgent': 1,
      'À faire auj.': 2,
      'En retard': 3,
      'À venir': 4,
      'Flexible': 5,
      'Effectuée': 6
    };

    // On renvoie une copie triée de la liste des todos
    return [...this.todos].sort((a, b) => {
      const etatA = this.getTodoEtat(a); // état du todo A
      const etatB = this.getTodoEtat(b); // état du todo B
      return (ordrePriorite[etatA] ?? 99) - (ordrePriorite[etatB] ?? 99);
      // Si priorityOrder[stateA] existe et n’est pas null ou undefined → on utilise cette valeur.
      // Sinon : on prend 99 par défaut
      // Valeur très haute pour les états inconnus, pour qu’ils soient triés à la fin.
    });
  }

}