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

      //creer 3 variables de type nombre
      let countUrgent = 0, countToday = 0, countLate = 0;

      countUrgent = this.todos.filter(obj =>
        obj.priorite != null && (obj.priorite >= 2 || (obj.priorite == 1 && // obj.priorite != null : pour sortir du cas où il n'y aurait pas de priorité indiquée
          new Date(obj.dueDate).toDateString() == today.toDateString()))).length;

      this.kpis[2].number = countUrgent;


      /*
            countToday = this.todos.filter(obj =>
              obj.priorite == 0 &&
              new Date() retourne un objet Date
                .toDateString() pour comparer uniquement le jour, mois, année. 
             Renvoie une chaine de caractère(utilisée pour comparer des égalités de jour, mois, année d'un objet Date 
             en ignorant les heures, minutes, secondes, millisecondes)
                   new Date(obj.dueDate).toDateString() == today.toDateString()).length;
      
            this.kpis[0].number = countToday;
      */



      for (let item of this.todos) {
        if (item.priorite == 0 && new Date(item.dueDate).toDateString() == today.toDateString()) {
          countToday = countToday + 1;
        }
      }
      this.kpis[0].number = countToday;


      /*
            for (let i = 0; i < this.todos.length; i++) {
              if (this.todos[i].priorite == 0 && new Date(this.todos[i].dueDate).toDateString() == today.toDateString()) {
                countToday = countToday + 1;
              }
            }
                  this.kpis[0].number = countToday;
      */

      /*
            countLate = this.todos.filter(obj => {
              const due = new Date(obj.dueDate);
              today.setHours(0, 0, 0, 0); // setHours permet de supprimer l’heure, les minutes, les secondes et les millisecondes 
              due.setHours(0, 0, 0, 0); // setHours permet de supprimer l’heure, les minutes, les secondes et les millisecondes 
              // d’un objet Date => comparaison juste sur la date (jour, mois, année).
              return due.getTime() < today.getTime(); // .getTime() convertit une Date en nombre lisible et comparable 
              // return pour indiquer su l'élément todo doit être gardé ou non dans le tableau filtré
              // (avec une autre date donc et avec les opérateurs <, >, <=, >=)
            }).length;
      
            this.kpis[1].number = countLate;
       */

      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < this.todos.length; i++) {

        let dueDate = new Date(this.todos[i].dueDate);
        dueDate.setHours(0, 0, 0, 0);

        if (dueDate < today)
          countLate = countLate + 1;
      }
      this.kpis[1].number = countLate;



    })
  }
}
