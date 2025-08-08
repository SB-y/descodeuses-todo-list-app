import { Component } from '@angular/core';
import { Utilisateur } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-utilisateurs',
  standalone: false,
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})


export class UtilisateursComponent {

  allUtilisateurs: Utilisateur[] = [];


  constructor(
    private utilisateurService: UserService,
    private snackBar: MatSnackBar  // Pour récupérer les utilisateurs
  ) { }

  ngOnInit(): void {
    this.fetchUtilisateur();
  }


  fetchUtilisateur() {
    this.utilisateurService.getUtilisateurs().subscribe((data) => {
      this.allUtilisateurs = data;
    }
    );
  }

  onDeleteUtilisateur(id: number | null) {
    if (id == null)
      return;

    this.utilisateurService.deleteUtilisateur(id).subscribe(() => {// actualiser la liste après la suppression
      this.fetchUtilisateur(); // synchronisation du front avec le "serveur" (visualier le changement dans l'affichage)
      this.snackBar.open('Supprimé !', '', { duration: 1000 });
    })

  }
}