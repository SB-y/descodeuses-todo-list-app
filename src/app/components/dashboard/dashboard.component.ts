import { Component, NgModule, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})




export class DashboardComponent implements OnInit {


  kpis = [
    {
      id: 1,
      title: "A faire aujourd'hui",
      number: 0,
      bg: "!bg-cyan-600",
      icon: "event"
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

  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }


  ngOnInit(): void {
    this.fetchTodo();
  }

  fetchTodo() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      // Variables de comptage
      let countUrgent = 0, countToday = 0, countLate = 0;
  
      // On ne garde que les tâches non terminées
      const activeTodos = this.todos.filter(obj => !obj.completed);
  
      for (let todo of activeTodos) {
        const dueDate = new Date(todo.dueDate);
        dueDate.setHours(0, 0, 0, 0);
  
        // En retard : dueDate < aujourd'hui, peu importe la priorité
        if (dueDate < today) {
          countLate++;
          continue; // déjà classée comme en retard, pas besoin de tester le reste
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
  
      // Mise à jour des KPIs
      this.kpis[0].number = countToday;
      this.kpis[1].number = countLate;
      this.kpis[2].number = countUrgent;
    });
  }
}

