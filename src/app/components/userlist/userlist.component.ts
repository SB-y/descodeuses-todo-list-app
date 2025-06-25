import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service'; // pour relier le composant ts au service
import { User } from '../../models/userlist.model';

// Dire à Angular : "Ceci est un composant" avec ses propriétés

@Component({
  selector: 'app-userlist',
  standalone: false,
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})


export class UserlistComponent implements OnInit{

  formGroup : FormGroup;
  users : User[] = [];


  // constructor() sert uniquement à initialiser la classe, injecter des dépendances.

  constructor(private fb: FormBuilder, private userService : UserService) {
    this.formGroup = this.fb.group({ 
      // this.formGroup : Crée une instance de FormGroup et la stocke dans la propriété formGroup du composant.formGroup servira à lier le formulaire HTML à la logique TypeScript.
      // fb est une instance de FormBuilder (injectée via le constructeur du composant). FormBuilder est une aide pratique pour créer des formulaires de manière concise.
    title: ['', [Validators.required]]
      // title est le nom du champ de formulaire.'' → valeur initiale vide. [Validators.required] → ce champ est obligatoire (ne peut pas être vide).
    });
  } 


  ngOnInit(): void { // ngOnInit est une méthode sans paramètre et sans valeur de retour. Appelée par Angular juste après la création du composant (après le constructeur, et avant l'affichage du composant).
    //Communication asynchrone donc il faut s'inscrire pour avoir le retour
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onAddUser() {
    if(this.formGroup.valid) {
      const formValue = this.formGroup.value;

      
    }
  }
}




