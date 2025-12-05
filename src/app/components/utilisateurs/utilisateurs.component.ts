import { Component, OnInit } from '@angular/core'; 
import { Utilisateur } from '../../models/user.model'; // modèle de données Utilisateur
import { UserService } from '../../services/user.service'; // service pour récupérer/supprimer les utilisateurs
import { MatSnackBar } from '@angular/material/snack-bar'; // pour afficher des notifications à l'utilisateur
import { AuthenService } from '../../auth/auth.guard/authen.service'; // service d'authentification/permissions
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogsuppuserComponent } from '../confirmation-dialogsuppuser/confirmation-dialogsuppuser.component';

@Component({
  selector: 'app-utilisateurs', // nom du composant dans le HTML
  standalone: false,             // ce n’est pas un composant standalone Angular 14+
  templateUrl: './utilisateurs.component.html', // template HTML
  styleUrl: './utilisateurs.component.css'      // fichier CSS associé
})




export class UtilisateursComponent implements OnInit {

  // Liste complète des utilisateurs récupérés depuis le serveur
  allUtilisateurs: Utilisateur[] = [];

  // Liste filtrée affichée dans le tableau (après recherche/filtrage)
  listeUtilisateursFiltre: Utilisateur[] = [];

  // Valeur entrée par l'utilisateur pour filtrer par nom/prénom
  rechercheNom: string = '';

  // Nombre d'utilisateurs affichés (mis à jour après filtrage)
  nombreUtilisateurs: number = 0;

  constructor(
    private utilisateurService: UserService, // injection du service pour récupérer/supprimer les utilisateurs
    private snackBar: MatSnackBar,           // injection pour afficher des messages rapides
    public authService: AuthenService,        // injection pour vérifier les permissions/authentification dans le template
    public dialoguser: MatDialog
  ) { }

  // Hook Angular appelé automatiquement après la création du composant
  ngOnInit(): void {
    this.fetchUtilisateur(); // récupérer tous les utilisateurs au chargement
  }

  // Fonction pour récupérer tous les utilisateurs depuis le serveur
  fetchUtilisateur() {
    this.utilisateurService.getUtilisateurs().subscribe((data) => {
      this.allUtilisateurs = data; // stocker tous les utilisateurs
      this.listeUtilisateursFiltre = [...this.allUtilisateurs]; // initialiser la liste filtrée avec tous les utilisateurs
      this.nombreUtilisateurs = this.listeUtilisateursFiltre.length; // mettre à jour le compteur affiché

      this.trierUtilisateurs(); 
    });
  }

  // Fonction pour filtrer les utilisateurs selon la recherche par nom/prénom
  filtrerUtilisateurs() {
    const f = this.rechercheNom.toLowerCase(); // passer la recherche en minuscules pour comparer
    this.listeUtilisateursFiltre = this.allUtilisateurs.filter(c => 
      c.name.toLowerCase().startsWith(f) || c.surname.toLowerCase().startsWith(f)
    );
    this.nombreUtilisateurs = this.listeUtilisateursFiltre.length; // mettre à jour le compteur

    this.trierUtilisateurs();
  }

  triSelection: string = 'AZ'; // valeur par défaut

  trierUtilisateurs() {
    switch (this.triSelection) {
      case 'AZ':
        this.listeUtilisateursFiltre.sort((a, b) =>
          (a.name).localeCompare(b.name));
        break;
  
      case 'ZA':
        this.listeUtilisateursFiltre.sort((a, b) =>
          ( b.name).localeCompare(a.name));
        break;
  
      case 'role':
        this.listeUtilisateursFiltre.sort((a, b) =>
          a.role.localeCompare(b.role));
        break;
  
      case 'id':
        this.listeUtilisateursFiltre.sort((a, b) => a.id - b.id);
        break;
    }
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
          this.onDeleteUtilisateur(id);
        } else if (result === false) {
          console.log("❎ Suppression annulée");
        } else {
          console.log("ℹ️ Fermeture du dialog sans action explicite");
        }
      });
    }



  // Supprimer un utilisateur par son id
  onDeleteUtilisateur(id: number | null) {
    if (id == null) return; // si id null, on ne fait rien

    this.utilisateurService.deleteUtilisateur(id).subscribe(() => {
      this.fetchUtilisateur(); // rafraîchir la liste après suppression
      this.snackBar.open('Supprimé !', '', { duration: 1000 }); // afficher un message temporaire
    });
  }
}