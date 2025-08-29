import { Component, OnInit } from '@angular/core'; 
import { Utilisateur } from '../../models/user.model'; // modèle de données Utilisateur
import { UserService } from '../../services/user.service'; // service pour récupérer/supprimer les utilisateurs
import { MatSnackBar } from '@angular/material/snack-bar'; // pour afficher des notifications à l'utilisateur
import { AuthenService } from '../../auth/auth.guard/authen.service'; // service d'authentification/permissions

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
    public authService: AuthenService        // injection pour vérifier les permissions/authentification dans le template
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

      this.trierUtilisateurs('id'); // trier par id par défaut
    });
  }

  // Fonction pour filtrer les utilisateurs selon la recherche par nom/prénom
  filtrerUtilisateurs() {
    const f = this.rechercheNom.toLowerCase(); // passer la recherche en minuscules pour comparer
    this.listeUtilisateursFiltre = this.allUtilisateurs.filter(c => 
      c.name.toLowerCase().startsWith(f) || c.surname.toLowerCase().startsWith(f)
    );
    this.nombreUtilisateurs = this.listeUtilisateursFiltre.length; // mettre à jour le compteur

    this.trierUtilisateurs('alphabet'); // trier par nom après filtrage
  }

  // Stocke le type de tri actuellement appliqué pour le template
  typeTri: 'id' | 'alphabet' = 'id';

  // Fonction pour trier la liste filtrée selon l'id ou l'ordre alphabétique
  trierUtilisateurs(par: 'id' | 'alphabet') {
    this.typeTri = par; // mémoriser le tri sélectionné

    if (par === 'id') {
      // tri numérique par id
      this.listeUtilisateursFiltre.sort((a, b) => a.id - b.id);
    } else if (par === 'alphabet') {
      // tri alphabétique par nom (insensible à la casse)
      this.listeUtilisateursFiltre.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    }
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