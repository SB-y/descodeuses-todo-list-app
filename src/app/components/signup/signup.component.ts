// 🔽 Importe les décorateurs et interfaces Angular nécessaires
import { Component, OnInit } from '@angular/core';

// 🔽 Importe les outils pour créer un formulaire réactif avec validation
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// 🔽 Importe le modèle d'utilisateur (interface ou classe)
import { Utilisateur } from '../../models/user.model';

// 🔽 Service qui permet d’appeler l’API pour gérer les utilisateurs
import { UserService } from '../../services/user.service';

// 🔽 Services Angular pour accéder aux paramètres de l'URL et gérer les redirections
import { ActivatedRoute, Router } from '@angular/router';

// 🔽 Service Angular Material pour afficher des messages temporaires (pop-up en bas de l’écran)
import { MatSnackBar } from '@angular/material/snack-bar';

// 🔽 Déclare un composant Angular
@Component({
  selector: 'app-signup', // Nom du composant dans le HTML (balise <app-signup>)
  standalone: false, // false car ce composant dépend d’un module
  templateUrl: './signup.component.html', // Lien vers le fichier HTML du composant
  styleUrl: './signup.component.css', // Lien vers le fichier CSS du composant
})

// 🔽 Déclaration de la classe du composant
export class SignupComponent implements OnInit {

  // 🔽 Liste des genres possibles pour l’inscription
  listGenre = [
    { text: "femme", value: "f" },
    { text: "homme", value: "h" }
  ];

  // 🔽 Représente le formulaire (FormGroup Angular)
  signupForm!: FormGroup;

  // 🔽 Contiendra l'utilisateur en cours d’édition (utile si mode modification)
  utilisateur!: Utilisateur;

  // 🔽 Injection des services nécessaires dans le constructeur
  constructor(
    private sb: FormBuilder, // 🔹 Pour construire le formulaire réactif
    private userService: UserService, // 🔹 Pour interagir avec l’API utilisateur
    private route: ActivatedRoute, // 🔹 Pour lire les paramètres de l'URL
    private snackBar: MatSnackBar, // 🔹 Pour afficher les messages (toast)
    private router: Router // 🔹 Pour rediriger après inscription
  ) {}

  // 🔽 Méthode exécutée automatiquement à l’initialisation du composant
  ngOnInit(): void {
    // 🔽 Récupère l'éventuel paramètre "id" de l'URL (utile si on veut modifier un utilisateur existant)
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      // 🔽 Si un ID est présent, on est en mode "édition"
      const id = Number(idParam);
      this.userService.getUtilisateur(id).subscribe(data => {
        this.utilisateur = data;

        // 🔽 Initialise le formulaire avec les données de l'utilisateur existant
        this.signupForm = this.sb.group({
          id: [this.utilisateur.id],
          name: [this.utilisateur.name, Validators.required],
          surname: [this.utilisateur.surname],
          username: [this.utilisateur.username],
          password: [this.utilisateur.password],
          genre: [this.utilisateur.genre]
        });
      });
    } else {
      // 🔽 Sinon, on est en mode "création", formulaire vide avec validations
      this.signupForm = this.sb.group({
        id: [],
        name: ['', Validators.required],
        surname: [''],
        username: ['', Validators.required],
        password: ['', Validators.required],
        genre: ['']
      });
    }
  }

  // 🔽 Fonction déclenchée à la soumission du formulaire
  onSubmit() {
    if (this.signupForm.invalid) return; // 🔴 Si formulaire invalide, on ne fait rien

    const formValue = this.signupForm.value; // 🔽 Récupère les données saisies

    // 🔽 Appelle le service pour envoyer les données à l’API
    this.userService.addUtilisateur(formValue).subscribe({
      next: (data) => {
        // ✅ Si succès : message de confirmation + redirection
        this.snackBar.open("Inscription réussie !", "Fermer", { duration: 3000 });
        this.router.navigate(['/dashboard']); // Redirige vers le tableau de bord
      },
      error: (err) => {
        // ❌ Si erreur : message d’erreur
        console.error("Erreur inscription :", err);
        this.snackBar.open("Erreur lors de l'inscription", "Fermer", { duration: 3000 });
      }
    });
  }

}

