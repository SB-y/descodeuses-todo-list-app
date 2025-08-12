import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})



export class ContactsComponent {

  constructor(public dialog: MatDialog, private service: ContactService) { }

  contacts: Contact[] = [];
  listeContactFiltre: Contact[] = [];
  rechercheNom: string = '';
  nombreContacts: number = 0;

  ngOnInit(): void {
    // pour la récup des contacts au chargement
    this.service.getContacts().subscribe(data => {
      this.contacts = data;
      this.listeContactFiltre = [...this.contacts];
      this.nombreContacts = this.contacts.length;
    });
  }



  filtrerContacts() {
    const f = this.rechercheNom.toLowerCase();
    this.listeContactFiltre = this.contacts.filter(c => c.nom.toLowerCase().startsWith(f) || c.prenom.toLowerCase().startsWith(f))
  }

  sendEmail(id: number) {
    const index = this.contacts.findIndex(item => item.id == id);
    window.location.href = `mailto:${this.contacts[index].email}`;
    console.log(this.contacts[index].email)

  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteContact(id); 
      } else if (result === false) {
        console.log('L\'utilisateur a annulé');
      } else {
        console.log('La boîte de dialogue a été fermée sans action explicite');
      }
    });

  }

  deleteContact(id: number) {
    this.service.deleteContact(id).subscribe(() => {
      // pour trouver l’index dans le tableau complet
      const index = this.contacts.findIndex(contact => contact.id === id);
      this.contacts.splice(index, 1); // méthode splice appliquée sur tableau

      // pour supprimer aussi dans la liste filtrée (car elle est affichée)
      const indexFiltre = this.listeContactFiltre.findIndex(contact => contact.id === id);
      this.listeContactFiltre.splice(indexFiltre, 1); 


      // pour mettre à jour le compteur
      this.nombreContacts = this.contacts.length;

    })
  };
}
