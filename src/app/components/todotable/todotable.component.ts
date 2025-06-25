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

}
