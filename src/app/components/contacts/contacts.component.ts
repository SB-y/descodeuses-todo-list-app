import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AuthenService } from '../../auth/auth.guard/authen.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-contacts',                   // sélecteur du composant (balise <app-contacts>)
  standalone: false,                          // composant non-standalone, déclaré dans un module
  templateUrl: './contacts.component.html',   // template associé
  styleUrl: './contacts.component.css'        // styles associés
})



export class ContactsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,                  // pour ouvrir des boîtes de dialogue Angular Material
    private service: ContactService,           // service qui gère les opérations CRUD sur les contacts
    public authService: AuthenService,         // service d’authentification (permet par ex. de vérifier si l’utilisateur est connecté)
    private snackBar: MatSnackBar              // pour afficher des messages temporaires (feedback utilisateur)
  ) { }

  contacts: Contact[] = [];          // liste complète des contacts (chargés du service)
  listeContactFiltre: Contact[] = [];// liste filtrée (après recherche)
  rechercheNom: string = '';         // chaîne de recherche saisie par l’utilisateur
  nombreContacts: number = 0;        // compteur de contacts

  ngOnInit(): void {
    // pour la récup des contacts au chargement
    this.service.getContacts().subscribe(data => {
      this.contacts = data;                          // on récupère les contacts depuis le service
      this.listeContactFiltre = [...this.contacts];  // copie de la liste → utilisée pour les recherches
      this.nombreContacts = this.contacts.length;    // mise à jour du compteur
    });
  }



  filtrerContacts() {
    // filtrage en fonction du nom OU du prénom
    const f = this.rechercheNom.toLowerCase();
    this.listeContactFiltre = this.contacts.filter(
      c => c.nom.toLowerCase().startsWith(f) || c.prenom.toLowerCase().startsWith(f)
    );
  }

  trierContactsAZ() {
    this.listeContactFiltre.sort((a, b) =>
      a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' })
    );
  }
  
  trierContactsZA() {
    this.listeContactFiltre.sort((a, b) =>
      b.nom.localeCompare(a.nom, 'fr', { sensitivity: 'base' })
    );
  }

  sendEmail(id: number) {
    // cherche le contact dans la liste
    const index = this.contacts.findIndex(item => item.id == id);

    // ouvre le client mail par défaut avec un "mailto:"
    window.location.href = `mailto:${this.contacts[index].email}`;

    // affichage debug console
    console.log(this.contacts[index].email);
  }

  openDialog(id: number) {
    // ouvre une boîte de confirmation Angular Material
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    // afterClosed() → observable qui émet la valeur passée à [mat-dialog-close]
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteContact(id);  // si l’utilisateur confirme → suppression
      } else if (result === false) {
        console.log('L\'utilisateur a annulé'); // si clique sur "Non"
      } else {
        console.log('La boîte de dialogue a été fermée sans action explicite'); // fermeture via clic extérieur ou "Esc"
      }
    });
  }

  deleteContact(id: number) {
    // appel au service pour supprimer un contact par ID
    this.service.deleteContact(id).subscribe({
      next: () => {
        // Suppression côté front uniquement si succès
        const index = this.contacts.findIndex(contact => contact.id === id);
        this.contacts.splice(index, 1); // supprime de la liste complète

        const indexFiltre = this.listeContactFiltre.findIndex(contact => contact.id === id);
        this.listeContactFiltre.splice(indexFiltre, 1); // supprime aussi de la liste filtrée

        this.nombreContacts = this.contacts.length; // mise à jour du compteur
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