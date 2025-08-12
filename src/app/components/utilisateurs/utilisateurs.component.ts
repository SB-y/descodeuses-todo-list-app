import { Component } from '@angular/core';
import { Utilisateur } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenService } from '../../auth/auth.guard/authen.service';

@Component({
  selector: 'app-utilisateurs',
  standalone: false,
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})


export class UtilisateursComponent {

  allUtilisateurs: Utilisateur[] = [];
  listeUtilisateursFiltre: Utilisateur[] = [];
  rechercheNom: string = '';
  nombreUtilisateurs: number = 0;


  constructor(
    private utilisateurService: UserService,
    private snackBar: MatSnackBar,  // Pour récupérer les utilisateurs,
    public authService: AuthenService
  ) { }

  ngOnInit(): void {
    this.fetchUtilisateur();
  }


  fetchUtilisateur() {
    this.utilisateurService.getUtilisateurs().subscribe((data) => {
      this.allUtilisateurs = data;
      this.listeUtilisateursFiltre = [...this.allUtilisateurs]; // initialiser avec tous les utilisateurs
      this.nombreUtilisateurs = this.listeUtilisateursFiltre.length; // nombre affiché aussi
    }
    );
  }

  filtrerUtilisateurs() {
    const f = this.rechercheNom.toLowerCase();
    this.listeUtilisateursFiltre = this.allUtilisateurs.filter(c => c.name.toLowerCase().startsWith(f) || c.surname.toLowerCase().startsWith(f))
    this.nombreUtilisateurs = this.listeUtilisateursFiltre.length;
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