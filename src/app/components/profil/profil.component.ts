import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utilisateur } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {


  // Liste des genres possibles pour l’inscription
  listGenre = [
    { text: "femme", value: "f" },
    { text: "homme", value: "h" }
  ];

  // Représente le formulaire (FormGroup Angular)
  profilForm!: FormGroup;

  // Contiendra l'utilisateur en cours d’édition (utile si mode modification)
  utilisateur!: Utilisateur;

  // Injection des services nécessaires dans le constructeur
  constructor(
    private pb: FormBuilder, // Pour construire le formulaire réactif
    private userService: UserService, // Pour interagir avec l’API utilisateur
    private route: ActivatedRoute, // Pour lire les paramètres de l'URL
    private snackBar: MatSnackBar, // Pour afficher les messages (toast)
    private router: Router // Pour rediriger après inscription
  ) { }

  // Méthode exécutée automatiquement à l’initialisation du composant
  ngOnInit(): void {

    this.userService.getUtilisateurConnecte().subscribe(data => {
      this.utilisateur = data;

      this.profilForm = this.pb.group({
        id: [this.utilisateur.id],
        name: [this.utilisateur.name || ''],
        surname: [this.utilisateur.surname || ''],
        username: [this.utilisateur.username || ''],
        genre: [this.utilisateur.genre || ''],
        password: [''] // mot de passe vide pour la modif éventuelle
      });
    });
  }


  // Fonction déclenchée à la soumission du formulaire
  onSubmit() {
    if (this.profilForm.invalid) return; // Si formulaire invalide, on ne fait rien

    const formValue = this.profilForm.value; // Récupère les données saisies

    // Si le mot de passe est vide, on le supprime du payload pour ne pas écraser le mot de passe en base
    if (!formValue.password) {
      delete formValue.password;
    }

    // Appelle le service pour envoyer les données à l’API
    this.userService.updateUtilisateur(formValue).subscribe({
      next: (data) => {
        // Si succès : message de confirmation + redirection
        this.snackBar.open("Inscription réussie !", "Fermer", { duration: 3000 });
        this.router.navigate(['/dashboard']); // Redirige vers le tableau de bord
      },
      error: (err) => {
        // Si erreur : message d’erreur
        console.error("Erreur inscription :", err);
        this.snackBar.open("Erreur lors de l'inscription", "Fermer", { duration: 3000 });
      }
    });
  }






}
