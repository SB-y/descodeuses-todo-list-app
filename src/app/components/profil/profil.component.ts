import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utilisateur } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenService } from '../../auth/auth.guard/authen.service';
import { ConfirmationDialogsuppuserComponent } from '../confirmation-dialogsuppuser/confirmation-dialogsuppuser.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {


  // Liste des genres possibles pour l’inscription
  listGenre = [
    { text: "Femme", value: "f" },
    { text: "Homme", value: "h" }
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
    private router: Router, // Pour rediriger après inscription
    public authService: AuthenService, // Pour rediriger après maj selon role
    public dialoguser: MatDialog,
  ) { }

  // Méthode exécutée automatiquement à l’initialisation du composant
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');

      if (idParam) {
        const id = Number(idParam);
        this.userService.getUtilisateur(id).subscribe(user => {
          this.utilisateur = user;
          this.initForm();
        }, err => {
          // gérer erreur, utilisateur non trouvé etc.
        });
      } else {
        this.userService.getUtilisateurConnecte().subscribe(user => {
          this.utilisateur = user;
          this.initForm();
        }, err => {
          // gérer erreur
        });
      }
    });
  }


  private initForm() {
    this.profilForm = this.pb.group({
      id: [this.utilisateur.id],
      name: [this.utilisateur.name || ''],
      surname: [this.utilisateur.surname || ''],
      username: [this.utilisateur.username || ''],
      genre: [this.utilisateur.genre || ''],
      password: [''],
      role: [this.utilisateur.role]
    });
  }

  // Fonction pour avoir les initiales de l'utilisateur connecté
  getInitiales(): string {
    if (!this.utilisateur) return '';

    const prenom = this.utilisateur.surname?.charAt(0) ?? '';
    const nom = this.utilisateur.name?.charAt(0) ?? '';

    return (prenom + nom).toUpperCase();
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
      next: () => {
        this.snackBar.open("Mise à jour du profil réussie !", '', { duration: 2000, panelClass: ['snackbar-small-text'] });

        if (this.authService.isAdmin()) {
          this.router.navigate(['/utilisateurs']);
        } else if (this.authService.isUser()) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/dashboard']); // fallback
        }
      },
      error: (err) => {
        console.error("Erreur profil :", err);
        this.snackBar.open("Erreur lors de la mise à jour", "Fermer", { duration: 3000 });
      }
    });
  }



  openDialog(id: number) {
    console.log("🪟 Ouverture du dialog pour suppression utilisateur:", id);

    const dialogRef = this.dialoguser.open(ConfirmationDialogsuppuserComponent, {
      width: '350px',
      disableClose: true // empêche la fermeture si clic extérieur
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Résultat du dialog :", result);

      if (result === true) {
        console.log("✅ L'utilisateur confirme la suppression");
        this.onDelete(id);
      } else if (result === false) {
        console.log("❎ Suppression annulée");
      } else {
        console.log("ℹ️ Fermeture du dialog sans action explicite");
      }
    });
  }


  // Supprimer un utilisateur par son id 
  onDelete(id: number | null) {
    if (id == null) return; // si id null, on ne fait rien 
    this.userService.deleteUtilisateur(id).subscribe(() => {
      this.snackBar.open('Supprimé !', '', { duration: 1000, panelClass: ['snackbar-small-text'] }); // afficher un message temporaire 
      this.router.navigate(["/login"]);
    });
  }


  // Retour à la page précédente
  onCancel() {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/utilisateurs']); // ou la page admin que tu veux
    } else {
      this.router.navigate(['/dashboard']); // la page user
    }

  }

}
