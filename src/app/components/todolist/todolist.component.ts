import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Projet } from '../../models/projet.model';
import { ProjetService } from '../../services/projet.service';


@Component({
  selector: 'app-todolist', // Nom du sélecteur HTML utilisé pour intégrer ce composant
  standalone: false, // Ce composant n’est pas standalone, il doit être déclaré dans un module
  templateUrl: './todolist.component.html', // Vue associée (template HTML)
  styleUrl: './todolist.component.css' // Feuille de style associée
})


export class TodoListComponent implements OnInit {

  formGroup: FormGroup;   // Formulaire pour gérer la saisie d’une tâche (Todo)
  todos: Todo[] = [];     // Liste des tâches (récupérées via le service)

  projformGroup: FormGroup; // Formulaire pour gérer la saisie d’un projet
  allProjets: Projet[] = []; // Liste de tous les projets (récupérés via le service)


  // Injection des dépendances (services et utilitaires Angular)
  constructor(
    private fb: FormBuilder,             // Pour construire le formGroup des todos
    private todoService: TodoService,    // Service qui gère les requêtes Todo (GET, POST, PUT, DELETE)
    private snackBar: MatSnackBar,       // Pour afficher des notifications (feedback visuel à l’utilisateur)
    private projetService: ProjetService,// Service qui gère les projets
    private fbp: FormBuilder             // Pour construire le formGroup des projets
  ) {
    // Initialisation du formulaire pour Todo
    this.formGroup = this.fb.group({
      title: ['', [Validators.required]] // champ obligatoire "title"
    });

    // Initialisation du formulaire pour Projet
    this.projformGroup = this.fbp.group({
      title: ['', [Validators.required]] // champ obligatoire "title"
    });
  }


  ngOnInit(): void {
    // Au chargement du composant → on récupère les données
    this.fetchTodo();
    this.fetchProjet();
  }



  // ================================
  // Partie action (gestion des todos)
  // ================================

  fetchTodo() {
    //Communication asynchrone donc il faut s'inscrire pour avoir le retour
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data; // On met à jour la liste locale avec les données reçues
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
        completed: false,       // par défaut une tâche est non terminée
        priorite: null,         // priorité non définie au départ
        dueDate: "",            // date limite vide
        textarea: null,         // description vide
        /*membres: [],
        memberIds: [],
        projetId: null,
        utilisateurId:null*/
      };

      // Envoi du nouveau Todo au serveur
      this.todoService.addTodo(todo).subscribe(data => {
        // actualiser la liste après l'ajout
        this.fetchTodo(); // synchronisation du front avec le "serveur" (visualier le changement dans l'affichage)
      });

    }
  }

  onDeleteTodo(id: number | null) {
    if (id == null)
      return;

    // Suppression côté serveur
    this.todoService.deleteTodo(id).subscribe(() => {
      // actualiser la liste après la suppression
      this.fetchTodo(); // synchronisation du front avec le "serveur" (visualier le changement dans l'affichage)
      this.snackBar.open('Supprimé !', '', { duration: 1000 }); // Feedback utilisateur
    })
  }


  onCheckChange(event: MatCheckboxChange, todo: Todo) {
    console.log(event.checked);
    todo.completed = event.checked; // Mettre à jour l’état local (coché ou décoché)

    // updateTodo() envoie une requête HTTP PUT (asynchrone) au serveur ou mock API, donc il retourne un Observable.
    // Avec .subscribe(), tu dis : "quand le serveur aura fini, exécute ce code."

    this.todoService.updateTodo(todo).subscribe(() => // suscribe pour écouter le retour
    {// actualiser la liste après la suppression
      this.fetchTodo();

      // Affiche une notification selon l’état
      if (todo.completed) {
        this.snackBar.open('Coché', '', { duration: 1000 });
      }

      else { this.snackBar.open('Décoché', '', { duration: 1000 }); }
    })
  }


  // ================================
  // Partie projet (gestion des projets)
  // ================================

  fetchProjet() {
    // Récupérer la liste des projets via le service
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
        id: formValue.id,           // Ici, on laisse passer l’id depuis le formulaire si fourni
        title: formValue.title,     // seulement le title est rempli depuis le formulaire
        description: formValue.description // éventuellement une description
      };

      // Envoi du nouveau Projet au serveur
      this.projetService.addProjet(projet).subscribe(data => {
        // actualiser la liste après l'ajout
        this.fetchProjet(); // synchronisation du front avec le "serveur" (visualier le changement dans l'affichage)
      });

    }
  }


  onDeleteProjet(id: number | null) {
    if (id == null)
      return;

    // Suppression côté serveur
    this.projetService.deleteProjet(id).subscribe(() => {
      // actualiser la liste après la suppression
      this.fetchProjet(); // synchronisation du front avec le "serveur" (visualier le changement dans l'affichage)
      this.snackBar.open('Supprimé !', '', { duration: 1000 }); // Notification
    })
  }

}
