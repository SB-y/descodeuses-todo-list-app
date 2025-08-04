import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Projet } from '../../models/projet.model';
import { ProjetService } from '../../services/projet.service';


@Component({
  selector: 'app-todolist',
  standalone: false,
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodoListComponent implements OnInit {

  onUpdateTodo(_t22: Todo) {
    throw new Error('Method not implemented.');
  }
  formGroup: FormGroup;
  todos: Todo[] = [];

  projformGroup: FormGroup;
  allProjets: Projet[] = [];


  constructor(private fb: FormBuilder, private todoService: TodoService, private snackBar: MatSnackBar, private projetService: ProjetService, private fbp: FormBuilder) {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required]]
    });

    this.projformGroup = this.fbp.group({
      title: ['', [Validators.required]]
    }

    );

  }
  ngOnInit(): void {
    this.fetchTodo();
    this.fetchProjet();
  }


  fetchTodo() {
    //Communication asynchrone donc il faut s'inscrire pour avoir le retour
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

 

  onAddTodo() {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
      //todo ici est construit uniquement à partir du title du formulaire, 
      // pour afficher ensuite cette tâche dans ta liste todos[] avec ce seul champ visible au départ.
      const todo: Todo = {
        id: null, // id généré sur le serveur, pour cela il est renvoyé null
        title: formValue.title, // seulement le title est rempli depuis le formulaire
        completed: false,
        priorite: null,
        dueDate: "",
        textarea: null,
        /*membres: [],
        memberIds: [],
        projetId: null,
        utilisateurId:null*/         
      };

      this.todoService.addTodo(todo).subscribe(data => {// actualiser la liste après l'ajout
        this.fetchTodo(); // synchronisation du front avec le "serveur" (visualier le changement dans l'affichage)
      });

    }
  }

  onDeleteTodo(id: number | null) {
    if (id == null)
      return;

    this.todoService.deleteTodo(id).subscribe(() => {// actualiser la liste après la suppression
      this.fetchTodo(); // synchronisation du front avec le "serveur" (visualier le changement dans l'affichage)
      this.snackBar.open('Supprimé !', '', { duration: 1000 });
    })
  }


  onCheckChange(event: MatCheckboxChange, todo: Todo) {
    console.log(event.checked);
    todo.completed = event.checked;



    // updateTodo() envoie une requête HTTP PUT (asynchrone) au serveur ou mock API, donc il retourne un Observable.
    // Avec .subscribe(), tu dis : "quand le serveur aura fini, exécute ce code."



    this.todoService.updateTodo(todo).subscribe(() => // suscribe pour écouter le retour
    {// actualiser la liste après la suppression
      this.fetchTodo();

      if (todo.completed) {
        this.snackBar.open('Coché', '', { duration: 1000 });
      }

      else { this.snackBar.open('Décoché', '', { duration: 1000 }); }
    })

  }




  fetchProjet() {
    this.projetService.getProjets().subscribe((data) => {
      this.allProjets = data;
    }
    );
  }


  onAddProjet() {
    if (this.projformGroup.valid) {
      const formValue = this.projformGroup.value;
      //todo ici est construit uniquement à partir du title du formulaire, 
      // pour afficher ensuite cette tâche dans ta liste todos[] avec ce seul champ visible au départ.
      const projet: Projet = {
        id: formValue.id,
        title: formValue.title, // seulement le title est rempli depuis le formulaire
        description: formValue.description     
      };

      this.projetService.addProjet(projet).subscribe(data => {// actualiser la liste après l'ajout
        this.fetchProjet(); // synchronisation du front avec le "serveur" (visualier le changement dans l'affichage)
      });

    }
  }


  onDeleteProjet(id: number | null) {

    if (id == null)
      return;

    this.projetService.deleteProjet(id).subscribe(() => {// actualiser la liste après la suppression
      this.fetchProjet(); // synchronisation du front avec le "serveur" (visualier le changement dans l'affichage)
      this.snackBar.open('Supprimé !', '', { duration: 1000 });
    })
  }

}


