import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-details', // nom du sélecteur HTML pour utiliser ce composant
  standalone: false,                // composant non-standalone, il dépend d'un module Angular
  templateUrl: './contact-details.component.html', // vue associée
  styleUrl: './contact-details.component.css'      // style associé
})
export class ContactDetailsComponent implements OnInit {

  id!: number; // Propriété accessible partout; le ! pour dire que cette variable sera initialisée avt utilisation
  contact!: Contact; // objet de type Contact (sera chargé depuis le service)
  contactForm!: FormGroup; // ! car cela est déclaré dans le ngOnInit, on aurait pu le faire dans le constructeur 
  // et ne pas mettre de point d'exclamation (en fait une propriété doit toujours être initialisée)

  contacts: Contact[] = [];  

  // Injection des dépendances :
  constructor(
    private route: ActivatedRoute,     // pour lire les paramètres de l’URL (id du contact)
    private router: Router,            // pour naviguer entre les pages
    private contactBuilder: FormBuilder, // utilitaire pour construire un formulaire réactif
    private service: ContactService,   // service pour gérer les données contact (API/mock)
    private snackBar: MatSnackBar      // affichage de notifications (toasts)
  ) { }


  ngOnInit(): void {
    // on utilise FormBuilder pour créer un formulaire réactif avec 5 champs : id, tel, email, nom, prenom.
    this.contactForm = this.contactBuilder.group({
      id: [null],
      nom: [''],
      prenom: [''],
      tel: [''],
      email: [''],
    });

    // Lecture de l'id depuis l'URL (ex: /contactdetails/2) pour savoir quel contact afficher ou modifier.
    // this.id crée une propriété persistante, accessible dans toutes les méthodes de la classe.
    this.id = Number(this.route.snapshot.paramMap.get('id')); // récupération de l'id ds l'url

    // si id != 0 → on est en mode "édition", donc on charge le contact depuis le service
    if (this.id !== 0) {

      // appel du service pour charger le contact existant depuis l'API ou la mémoire.
      this.service.getContact(this.id).subscribe(data => {
        this.contact = data; // on sauvegarde le contact reçu dans la propriété locale

        // on remplit le formulaire avec les infos du contact
        this.contactForm.patchValue({
          // patchValue() permet de mettre à jour certains ou tous les champs du formulaire
          id: data.id,
          nom: data.nom,
          prenom: data.prenom,
          tel: data.tel,
          email: data.email,
        });
      });
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contact = this.contactForm.value; // récupération des valeurs du formulaire

      if (this.id === 0) {
        // pour l'ajout d'un contact
        this.service.addContact(contact).subscribe(() => {
          this.snackBar.open('Nouveau contact ajouté', '', { duration: 1000 }); // message utilisateur
          this.router.navigate(["/contacts"]); // redirection vers la liste des contacts
        });
      } else {
        // pour la mise à jour du contact
        this.service.updateContact(contact).subscribe(() => {
          this.snackBar.open('Contact mis à jour', '', { duration: 1000 }); // message utilisateur
          this.router.navigate(["/contacts"]); // retour à la liste après mise à jour
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(["/contacts"]); // pour retourner à la page générale liste contacts
  }


  onDelete(id: number) {
    // appel au service pour supprimer un contact par ID
    this.service.deleteContact(id).subscribe({
      next: () => {
        // Suppression côté front uniquement si succès
        const index = this.contacts.findIndex(contact => contact.id === id);
        this.contacts.splice(index, 1); // supprime de la liste complète
      },
      error: (err) => {
        // Affiche un snackbar si le back renvoie une erreur
        this.snackBar.open(
          'Ce contact est lié à une tâche. Veuillez le retirer d\'abord de la todo !',
          '',
          { duration: 3000 } // durée d’affichage en ms
        );
        console.error('Erreur suppression contact', err);
      }
    });
  }

}