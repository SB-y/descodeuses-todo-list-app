import { Component, OnInit } from '@angular/core';
import { Projet } from '../../models/projet.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjetService } from '../../services/projet.service';

@Component({
  selector: 'app-projetdetails',             // Sélecteur du composant dans le template parent
  standalone: false,                         // Non-standalone : déclaré dans un module Angular
  templateUrl: './projetdetails.component.html', // Template associé
  styleUrl: './projetdetails.component.css'      // Styles associés
})



export class ProjetdetailsComponent implements OnInit {

  currentProjet = "";                        // Chaîne stockant l’état courant du champ projet (si utilisée dans le template)
  selectedProjet: Projet | null = null;      // Projet sélectionné (ex. depuis une liste déroulante)
  allProjets: Projet[] = [];                 // Liste complète des projets (chargés depuis le service)
  filteredProjets: Projet[] = [];            // Version filtrée (recherche/filtre UI)

  projet!: Projet; // le projet à afficher    // Objet projet courant (chargé par l’ID de l’URL)
  projetForm!: FormGroup;                    // Formulaire réactif pour éditer un projet


  constructor(
    private route: ActivatedRoute,    // Pour récupérer params URL
    private projetBuilder: FormBuilder, // Pour construire le FormGroup
    private snackBar: MatSnackBar,    // Notifications utilisateur (toasts)
    private router: Router,           // Navigation après actions
    private projetService: ProjetService, // Accès aux données Projet (API/mock)
  ) { }



  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Récupération de l'ID projet depuis l'URL (ex: /projetdetails/3)

    this.projetService.getProjet(id).subscribe(data => {           // appel au service pour récupérer le projet
      this.projet = data;                                          

      // Construction du formulaire avec les valeurs initiales du projet
      this.projetForm = this.projetBuilder.group({
        id: [this.projet.id],                         // Champ ID (généralement en lecture seule côté UI)
        title: [this.projet.title, Validators.required], // Titre requis
        description: [this.projet.description],       // Description optionnelle
      });


      // Chargement des projets disponibles
      this.projetService.getProjets().subscribe(projets => {
        this.allProjets = projets;        // Liste complète (ex. pour auto-complétion/sélection)
        this.filteredProjets = projets;   // Par défaut, aucun filtre appliqué
      });
    });
  }


  onSubmitProjet() {

    // Vérifier la validité du formulaire
    if (this.projetForm.valid) {
      // Copier les valeurs du formulaire (spread pour éviter de muter le form directement)
      const formValue = { ...this.projetForm.value };

      formValue.projetId = formValue.projet; // Remap d’un champ "projet" potentiel vers "projetId" attendu par le backend
      delete formValue.projet;               // Nettoyage du champ intermédiaire

      // Debug
      console.log("Formulaire envoyé :", JSON.stringify(formValue));

      // Envoi de la mise à jour au backend
      this.projetService.updateProjet(formValue).subscribe({
        next: (data) => {
          console.log('Projet reçu depuis le backend :', data); 
          this.snackBar.open('Projet mis à jour', '', { duration: 1000 }); 
          this.router.navigate(["/todolist"]); // Redirection vers la page todolist 
        },
        error: (error) => {
          console.error("Erreur lors de la mise à jour :", error); // Gestion d’erreur simple via console
        }
      });
    }
  }


  onCancel() {
    this.router.navigate(["/todolist"]); // pour retourner à la page générale todolist
  }


}