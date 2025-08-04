import { Component } from '@angular/core';
import { Projet } from '../../models/projet.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjetService } from '../../services/projet.service';

@Component({
  selector: 'app-projetdetails',
  standalone: false,
  templateUrl: './projetdetails.component.html',
  styleUrl: './projetdetails.component.css'
})



export class ProjetdetailsComponent {

    currentProjet = "";
    selectedProjet: Projet | null = null;
    allProjets: Projet[] = [];
    filteredProjets: Projet[] = [];

    projet!: Projet; // la todo à afficher
    projetForm!: FormGroup;


    constructor(
      private route: ActivatedRoute,    // Pour récupérer params URL
      private projetBuilder: FormBuilder,
      private snackBar: MatSnackBar,
      private router: Router,
      private projetService: ProjetService,
    ) { }
  
  

    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));

      this.projetService.getProjet(id).subscribe(data => {           // appel au service pour récupérer la todo
        this.projet = data;

        this.projetForm = this.projetBuilder.group({
          id: [this.projet.id],
          title: [this.projet.title, Validators.required],
          description: [this.projet.description],
        });


            // Chargement des projets disponibles
    this.projetService.getProjets().subscribe(projets => {
      this.allProjets = projets;
      this.filteredProjets = projets;
    });
    });
  }


  onSubmitProjet() {

    // Vérifier la validité du formulaire
    if (this.projetForm.valid) {
      // Copier les valeurs du formulaire
      const formValue = { ...this.projetForm.value };

      formValue.projetId = formValue.projet;
      delete formValue.projet;

      // Debug
      console.log("Formulaire envoyé :", JSON.stringify(formValue));

      // Envoi de la mise à jour au backend
      this.projetService.updateProjet(formValue).subscribe({
        next: (data) => {
          console.log('Tâche reçue depuis le backend :', data);
          this.snackBar.open('Todo mis à jour', '', { duration: 1000 });
          this.router.navigate(["/todolist"]);
        },
        error: (error) => {
          console.error("Erreur lors de la mise à jour :", error);
        }
      });
    }
  }


  onCancel() {
    this.router.navigate(["/todolist"]); // pour retourner à la page générale todolist
  }


}