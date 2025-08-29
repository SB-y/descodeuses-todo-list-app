import { Component, NgModule, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';


@Component({
  selector: 'app-dashboard', // Nom du composant utilisé dans les templates
  standalone: false,
  templateUrl: './dashboard.component.html', // Template HTML associé
  styleUrl: './dashboard.component.css' // CSS associé
})
export class DashboardComponent implements OnInit {

  // Définition des KPIs affichés dans le dashboard
  kpis = [
    {
      id: 1,
      title: "A faire aujourd'hui",
      number: 0,           // Valeur dynamique qui sera mise à jour
      bg: "!bg-cyan-600",  // Couleur de fond
      icon: "event"         // Icône à afficher
    },
    {
      id: 2,
      title: "Taches en retard",
      number: 0,
      bg: "!bg-yellow-600",
      icon: "warning"
    },
    {
      id: 3,
      title: "Urgentes",
      number: 0,
      bg: "!bg-pink-600",
      icon: "priority_high"
    },
  ];

  todos: Todo[] = []; // Tableau qui contiendra toutes les tâches

  constructor(private todoService: TodoService) { } // Injection du service Todo

  ngOnInit(): void {
    this.fetchTodo(); // Au chargement du composant, on récupère les todos
  }

  fetchTodo() {
    // Appel au service pour récupérer les tâches (observable)
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data; // On stocke les todos reçues

      const today = new Date();
      today.setHours(0, 0, 0, 0); // On remet l'heure à 00:00 pour les comparaisons

      // Variables de comptage pour chaque KPI
      let countUrgent = 0, countToday = 0, countLate = 0;
      let countNoDueDate = 0; // Pour les tâches sans date limite

      // On ne garde que les tâches non terminées
      const activeTodos = this.todos.filter(obj => !obj.completed);

      for (let todo of activeTodos) {

        if (!todo.dueDate) {
          // Si pas de dueDate, on incrémente le compteur correspondant
          countNoDueDate++; 
          continue; // On passe à la tâche suivante
        }

        const dueDate = new Date(todo.dueDate);
        dueDate.setHours(0, 0, 0, 0); // Normalisation de l'heure pour la comparaison

        // En retard : dueDate < aujourd'hui, peu importe la priorité
        if (dueDate < today) {
          countLate++;
          continue; // On ne teste pas les autres conditions
        }

        // A faire aujourd’hui : dueDate == aujourd’hui
        if (dueDate.getTime() === today.getTime()) {
          countToday++;
        }

        // Urgent : priorité >= 2 ET dueDate >= aujourd’hui
        if (todo.priorite != null && todo.priorite >= 2 && dueDate >= today) {
          countUrgent++;
        }
      }

      // Mise à jour des KPIs avec les valeurs calculées
      this.kpis[0].number = countToday;  // A faire aujourd'hui
      this.kpis[1].number = countLate;   // Tâches en retard
      this.kpis[2].number = countUrgent; // Tâches urgentes
      // Remarque : countNoDueDate n'est pas utilisé ici, mais pourrait servir pour un KPI "Sans échéance"
    });
  }
}