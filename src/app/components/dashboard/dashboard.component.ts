import { Component, OnInit } from '@angular/core';
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
    { id: 'Urgent', title: "Urgentes", number: 0, bg: "!bg-pink-400", icon: "priority_high", etat: "Urgent" },
    { id: 'Auj', title: "À faire aujourd'hui", number: 0, bg: "!bg-cyan-400", icon: "event", etat: "À faire auj." },
    { id: 'Late', title: "En retard", number: 0, bg: "!bg-orange-400", icon: "warning", etat: "En retard" },
    { id: 'Future', title: "À venir", number: 0, bg: "!bg-blue-400", icon: "schedule", etat: "À venir" },
   // { id: 'Done', title: "Effectuées", number: 0, bg: "!bg-lime-600", icon: "done", etat: "Effectuée" },
    { id: 'Flexible', title: "Flexibles", number: 0, bg: "!bg-gray-400", icon: "more_time", etat: "Flexible" },
  ];

  todos: Todo[] = [];
  recentTodos: Todo[] = [];
  completedTodos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodo();
  }

  fetchTodo() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
      this.calculerKpis();

      this.recentTodos = [...this.todos]
        .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
        .slice(0, 5);

      this.completedTodos = this.todos.filter(t => t.completed);
    });
  }

  calculerKpis() {
    this.kpis.forEach(kpi => kpi.number = 0);

    for (let todo of this.todos) {
      const etat = this.getTodoEtat(todo);

      const kpi = this.kpis.find(k => k.etat === etat);
      if (kpi) kpi.number++;
    }
  }

  getTodoEtat(todo: Todo): string {
    if (todo.completed) return 'Effectuée';
    if (!todo.dueDate) return 'Flexible';

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const dueDate = new Date(todo.dueDate); dueDate.setHours(0, 0, 0, 0);

    if (dueDate.getTime() === today.getTime()) return 'À faire auj.';
    if (todo.priorite != null && todo.priorite >= 2) return 'Urgent';
    if (dueDate < today) return 'En retard';
    

    return 'À venir';
  }

  getTodosByEtat(etat: string): Todo[] {
    return this.todos.filter(t => this.getTodoEtat(t) === etat);
  }


    // pour la barre de progression
    getProgressionGlobale(): number {
      if (!this.todos.length) return 0;
      const done = this.todos.filter(t => t.completed).length;
      return Math.round((done / this.todos.length) * 100);
    }

    // pour le systme de badge selon % progression
    getBadgeMotivation(): { label: string, color: string, icon: string } {
      const p = this.getProgressionGlobale();
    
      if (p < 20) return { label: "Débutant", color: " text-gray-700", icon: "hourglass_empty" };
      if (p < 40) return { label: "En route", color: " text-blue-800", icon: "directions_walk" };
      if (p < 60) return { label: "Motivé", color: " text-yellow-800", icon: "trending_up" };
      if (p < 80) return { label: "Productif", color: " text-green-800", icon: "task_alt" };
      return { label: "Champion", color: " text-purple-900", icon: "emoji_events" };
    }
    
    

  
}
