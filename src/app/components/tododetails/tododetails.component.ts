import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // <-- important
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-tododetails',
  standalone: false,
  templateUrl: './tododetails.component.html',
  styleUrl: './tododetails.component.css'
})


export class TododetailsComponent implements OnInit {


  listPriorite = [
    { number: 0, value: "0" },
    { number: 1, value: "1" },
    { number: 2, value: "2" },
    { number: 3, value: "3" },
    { number: 4, value: "4" },
  ]

  todo!: Todo; // la todo à afficher
  todoForm!: FormGroup;


  constructor(
    private route: ActivatedRoute,    // Pour récupérer params URL
    private todoService: TodoService,
    private todoBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router : Router
  ) { }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // récupération de l'id ds l'url

    this.todoService.getTodo(id).subscribe(data => {           // appel au service pour récupérer la todo
      this.todo = data;

      // création du formulaire AVEC les valeurs de la todo 
      this.todoForm = this.todoBuilder.group({
        id: [this.todo.id],
        title: [this.todo.title, Validators.required],
        completed: [this.todo.completed],
        priorite: [this.todo.priorite],
        dueDate: [this.todo.dueDate],
        textarea: [this.todo.textarea], 
      });
    });
  }


  onSubmitTodo() {
    if (this.todoForm.valid) {
    
      this.todoService.updateTodo(this.todoForm.value).subscribe((data) => {
        console.log("Mise à jour réussie !");
        this.snackBar.open('Todo mis à jour', '', { duration: 1000 }); // pour afficher le popup
        this.router.navigate(["/todotable"]); // pour retourner à la page générale todolist
      });
    }
  }


  onCancel() {
    this.router.navigate(["/todotable"]); // pour retourner à la page générale todolist
  }



}