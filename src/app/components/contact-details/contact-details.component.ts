import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-details',
  standalone: false,
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent implements OnInit {

  id!: number; // Propriété accessible partout
  contact!: Contact;
  contactForm!: FormGroup; // ! car cela est déclaré dans le ngOnInit, on aurait pu le faire dans le constructeur 
  // et ne pas mettre de point d'exclamation
  // en fait une propriété doit toujours être initialisée





  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactBuilder: FormBuilder,
    private service: ContactService,
    private snackBar: MatSnackBar) { }




  ngOnInit(): void {

    //on utilise FormBuilder pour créer un formulaire réactif avec 5 champs : id, tel, email, nom, prenom.
    this.contactForm = this.contactBuilder.group({
      id: [null],
      nom: [''],
      prenom: [''],
      tel: [''],
      email: [''],
      image: [''],
    });


    // Lecture de l'id depuis l'URL (ex: /contactdetails/2) pour savoir quel contact afficher ou modifier.
    // this.id crée une propriété persistante, accessible dans toutes les méthodes de la classe.

    this.id = Number(this.route.snapshot.paramMap.get('id')); // récupération de l'id ds l'url

    if (this.id !== 0) {

      // appel du service pour charger le contact existant depuis l'API ou la mémoire.
      this.service.getContact(this.id).subscribe(data => {
        this.contact = data;

        this.contactForm.patchValue({ //méthode de FormGroup qui permet de remplir certains ou tous les champs du formulaire.
          // par ex, mettra à jour uniquement le champ nom dans le formulaire sans toucher les autres.
          id: data.id,
          nom: data.nom,
          prenom: data.prenom,
          tel: data.tel,
          email: data.email,
          image: data.image,
        });
      });
    }

    else {
      // l'image est la même pour l'instant
      this.contactForm.patchValue({
        image: 'assets/koala.jpg'
      });
    }

  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contact = this.contactForm.value;

      if (this.id === 0) {
        // pour l'ajout d'un contact
        this.service.addContact(contact).subscribe(() => {
          this.snackBar.open('Nouveau contact ajouté', '', { duration: 1000 });
        });
      } else {
        // pour la mise à jour du contact
        this.service.updateContact(contact).subscribe(() => {
          this.snackBar.open('Contact mis à jour', '', { duration: 1000 });
        });
      }
    }
  }


  onCancel() {
    this.router.navigate(["/contacts"]); // pour retourner à la page générale todolist
  }


}
