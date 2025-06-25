import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



//@ signifie décorateur
// qui décore la classe component
// vient juste avant la classe

@Component({
  selector: 'app-login',
  standalone: false, // composant accessible via un module seulement, obligatoire de le mettre dans déclarations de app.module.ts
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

// implements pour implémenter une interface
// une classe peut implémenter plusieurs interfaces

export class LoginComponent implements OnInit {

  // on ajoute ! pour pouvoir initialiser la varible loginForm ultérieurement
  loginForm!: FormGroup;


  //injection automatique de angular utilisée pour récupérer un objet form builder
  // qui va construire le formulaire et l'on va ajouter ce que l'on veut dans les paramètres
  // on ajoute private pour pouvoir accéder à formBuilder en dehors du constructeur
  constructor(private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        username: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]]
      }
    );
  }

  onSubmit() {

    if(this.loginForm.valid) {
    console.log(this.loginForm.value)};


if(this.loginForm.value.username == "admin@test.com" && this.loginForm.value.password == "admin") {
  sessionStorage.setItem("isLoggedIn", "true");
  this.router.navigateByUrl("/dashboard");
}

  }

}

