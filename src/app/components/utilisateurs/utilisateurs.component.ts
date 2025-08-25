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

      this.trierUtilisateurs('id'); // trier par id par défaut
    }
    );
  }

  filtrerUtilisateurs() {
    const f = this.rechercheNom.toLowerCase();
    this.listeUtilisateursFiltre = this.allUtilisateurs.filter(c => c.name.toLowerCase().startsWith(f) || c.surname.toLowerCase().startsWith(f))
    this.nombreUtilisateurs = this.listeUtilisateursFiltre.length;

    this.trierUtilisateurs('alphabet'); // par exemple trier par nom après filtrage
  }


  typeTri: 'id' | 'alphabet' = 'id'; // on stocke le type de tri pour le récupérer dans le html

  trierUtilisateurs(par: 'id' | 'alphabet') {
    this.typeTri = par; // on mémorise le tri sélectionné

    if (par === 'id') {
      this.listeUtilisateursFiltre.sort((a, b) => a.id - b.id);
    } else if (par === 'alphabet') {
      this.listeUtilisateursFiltre.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    }
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