import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenService } from '../../auth/auth.guard/authen.service';
import { TodoService } from '../../services/todo.service';



// @Component est un décorateur qui indique qu'on crée un composant Angular
@Component({
  selector: 'app-login',             // sélecteur HTML pour utiliser ce composant
  standalone: false,                 // le composant doit être déclaré dans un module (ex: app.module.ts)
  templateUrl: './login.component.html',  // fichier HTML associé
  styleUrl: './login.component.css'        // fichier CSS associé
})

// La classe implémente l'interface OnInit, permettant d'utiliser la méthode ngOnInit au démarrage du composant
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;       // formulaire réactif, le ! indique qu'on l'initialisera plus tard
  errorMessage: string = '';   // message d'erreur à afficher en cas d'échec de login

  // Injection des dépendances : formBuilder (pour créer le formulaire), router (navigation), auth (service d'authentification)
  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthenService, private todoService: TodoService) { }

  // Initialisation du formulaire avec des champs username et password et leurs validations
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]], // username obligatoire et doit être un email valide
      password: ["", [Validators.required]]                     // password obligatoire
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    // Vérifie si le formulaire est valide (tous les champs valides)
    if (this.loginForm.valid) {
      // Appelle la méthode login du service AuthenService en passant les valeurs du formulaire
      this.auth.login(this.loginForm.value).subscribe({
        next: (response) => {
          // En cas de succès : affichage dans la console de la réponse backend
          console.log("Réponse login backend:", response);
          // Stockage du token JWT dans localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          console.log("Role détecté :", localStorage.getItem('role'));
          // Marque l'utilisateur comme connecté dans sessionStorage
          sessionStorage.setItem('isLoggedIn', 'true');
          // CHARGEMENT DES TODOS JUSTE APRÈS LOGIN !
          this.todoService.getTodos().subscribe({
            next: () => {
              // Lorsque tout est prêt → Go dashboard
              this.router.navigateByUrl('/dashboard');
            },
            error: () => {
              // En cas d'échec → on navigue quand même
              this.router.navigateByUrl('/dashboard');
            }
          });
        },
        error: (err) => {
          // En cas d'erreur : affichage d'un message d'erreur customisé
          this.errorMessage = 'Login failed: ' + (err.error?.message || 'Unknown error');
          console.error('Login failed', err);
        }
      });
    }
  }

}

