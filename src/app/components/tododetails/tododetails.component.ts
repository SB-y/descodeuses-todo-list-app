// Importation des modules de base Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Pour accéder aux paramètres d'URL et rediriger
import { TodoService } from '../../services/todo.service';  // Service pour gérer les todos
import { Todo } from '../../models/todo.model';             // Modèle de données Todo
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; // Formulaire réactif
import { MatSnackBar } from '@angular/material/snack-bar'; // Pour les notifications
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'; // Autocomplete Material
import { ProjetService } from '../../services/projet.service'; // Service pour projets
import { Projet } from '../../models/projet.model';             // Modèle Projet
import { Contact } from '../../models/contact.model';           // Modèle Contact
import { ContactService } from '../../services/contact.service';// Service pour contacts
import { Utilisateur } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';


// Déclaration du composant
@Component({
  selector: 'app-tododetails',                 // Nom du composant HTML
  standalone: false,
  templateUrl: './tododetails.component.html', // Template HTML
  styleUrl: './tododetails.component.css'      // Feuille de style CSS
})

export class TododetailsComponent implements OnInit {

  // Gestion du champ autocomplete pour les contacts
  currentContact = new FormControl('');
  selectedContacts: Contact[] = []; // Contacts sélectionnés (liés à la tâche)
  allContacts: Contact[] = [];      // Tous les contacts dispo (depuis le backend)
  filteredContacts: Contact[] = []; // Contacts filtrés (pour l'autocomplete)
  isOwner: boolean = true; // Pour initialiser le statut de l'utilisateur connecté

  // Gestion des projets liés à la tâche
  currentProjet = "";
  selectedProjet: Projet | null = null;
  allProjets: Projet[] = [];
  filteredProjets: Projet[] = [];

  // Gestion des projets liés à l'utilisateur'
  currentUtilisateur = "";
  selectedUtilisateur: Utilisateur | null = null;
  allUtilisateurs: Utilisateur[] = [];
  filteredUtilisateurs: Utilisateur[] = [];

  // Liste des priorités possibles
  listPriorite = [
    { number: 0 },
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
  ];

  todo!: Todo;           // Tâche actuelle à afficher/modifier
  todoForm!: FormGroup;  // Formulaire de modification

  //Partie mini messagerie
  todoId!: number;
  messages: Message[] = [];
  newMessage: string = '';
  currentUserId!: number;

  // Constructeur avec injection des services
  constructor(
    private route: ActivatedRoute,      // Pour récupérer l'ID de la todo via l'URL
    private todoService: TodoService,   // Service de todo (CRUD)
    private todoBuilder: FormBuilder,   // Pour construire le formulaire
    private snackBar: MatSnackBar,      // Pour affichage des messages
    private router: Router,             // Pour rediriger l’utilisateur
    private contactService: ContactService, // Pour récupérer les contacts
    private projetService: ProjetService,    // Pour récupérer les projets
    private userService: UserService, // Pour récupérer les utilisateurs de l'app
    private messageService: MessageService, // Pour récupérer les messages liées à la tâche
  ) { }

  // Fonction exécutée à l'initialisation du composant
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Appelle le backend pour récupérer la todo par ID
    this.todoService.getTodo(id).subscribe(data => {
      console.log('Données reçues du backend:', data);
      this.todo = data;

      console.log('Tâche chargée:', this.todo);
      console.log('Priorité reçue:', this.todo.priorite, 'type:', typeof this.todo.priorite);
      console.log(this.todo.surname, this.todo.name);


      // Initialisation du formulaire avec les données existantes
      this.todoForm = this.todoBuilder.group({
        id: [this.todo.id],
        title: [this.todo.title, Validators.required],
        completed: [this.todo.completed],
        priorite: [this.todo.priorite],
        dueDate: [this.todo.dueDate],
        textarea: [this.todo.textarea],
        membres: [this.todo.membres || []], // Liste des membres sélectionnés
        projet: [this.todo.projet?.id || null], // ID du projet associé
        //utilisateur: [this.todo.utilisateurId || null], // <-- Utilisateur ID ici si formcontrolename utilisateur
        assignedUserIds: [this.todo.assignedUserIds || []]
      });

      // Stockage local des valeurs sélectionnées
      this.selectedProjet = this.todo.projet || null;
      this.selectedContacts = this.todo.membres || [];
      //this.selectedUtilisateur = this.todo.utilisateur || null;


      // Une fois la tâche récupérée → récupère l'utilisateur connecté
      this.userService.getUtilisateurConnecte().subscribe(currentUser => {

        this.currentUserId = currentUser.id;

        // Vérifie si l'utilisateur connecté est l'auteur
        const isOwner = this.todo.utilisateurId === currentUser.id;

        if (!isOwner) {
          // Si ce n’est pas lui → désactiver les champs et bloquer les actions
          Object.keys(this.todoForm.controls).forEach(controlName => {
            this.todoForm.get(controlName)?.disable();
          });
          this.currentContact.disable();
        }
      });

      // Récupère tous les contacts pour alimenter l’autocomplete
      this.contactService.getContacts().subscribe(contacts => {
        this.allContacts = contacts;
        this.filteredContacts = contacts;
      });

      // Récupère tous les projets
      this.projetService.getProjets().subscribe(projets => {
        this.allProjets = projets;
        this.filteredProjets = projets;
      });

      // Récupère tous les utilisateurs de l’appli
      this.userService.getUtilisateurs().subscribe(users => {
        this.allUtilisateurs = users;
        this.filteredUtilisateurs = users;
      });

      //Récupère les messages de la mini messagerie
      this.todoId = Number(this.route.snapshot.paramMap.get('id'));
      this.loadMessages();
    });
  }



  onSubmitTodo() {
    // Vérifie si l'utilisateur connecté est autorisé
    this.userService.getUtilisateurConnecte().subscribe(currentUser => {
      if (this.todo.utilisateurId !== currentUser.id) {
        this.snackBar.open('❌ Vous ne pouvez pas modifier cette tâche.', '', { duration: 2000, panelClass: ['snackbar-small-text'] });
        return;
      }

      // Si autorisé → on continue ici

      // si une date est présente, on la convertit au format ISO local
      if (this.todoForm.value.dueDate) {
        this.todoForm.value.dueDate = this.toLocalIsoString(this.todoForm.value.dueDate);
      }

      // Vérifie que le formulaire est valide
      if (this.todoForm.valid) {
        const formValue = { ...this.todoForm.value }; // Copie des données du formulaire

        // force la priorité en type number (au cas où c’est string)
        formValue.priorite = Number(formValue.priorite);

        // Prépare l’ID du projet à envoyer
        formValue.projetId = formValue.projet;
        delete formValue.projet;

        // Prépare la liste des IDs de membres sélectionnés
        formValue.memberIds = this.selectedContacts.map(contact => contact.id);

        // Copie l’identifiant de l’auteur
        formValue.utilisateurId = this.todo.utilisateurId;

        // Prépare la liste des IDs de membres assignés
        formValue.assignedUserIds = this.todoForm.value.assignedUserIds;

        // Affiche les données envoyées pour debug
        console.log("Formulaire envoyé :", JSON.stringify(formValue));

        // appelle le service pour mettre à jour la todo
        this.todoService.updateTodo(formValue).subscribe({
          next: (data) => {
            console.log('Tâche reçue depuis le backend :', data);
            this.snackBar.open('Tâche mise à jour', '', { duration: 1000, panelClass: ['snackbar-small-text'] });
            this.router.navigate(["/dashboard"]);
          },
          error: (error) => {
            console.error("Erreur lors de la mise à jour :", error);
          }
        });
      }
    });
  }


  // Retour à la page des todos sans rien enregistrer
  onCancel() {
    this.router.navigate(["/todolist"]);
  }

  // Corrige le décalage horaire et retourne une date ISO "locale"
  toLocalIsoString(dateString: string): string {
    const dateObject = new Date(dateString);
    return new Date(dateObject.getTime() - dateObject.getTimezoneOffset() * 60000).toISOString();
  }

  // Appelée quand un contact est sélectionné depuis l’autocomplete
  selected(event: MatAutocompleteSelectedEvent) {
    const contact = event.option.value as Contact;
    // Évite les doublons
    if (!this.selectedContacts.find(c => c.id === contact.id)) {
      this.selectedContacts.push(contact);
      this.todoForm.get('membres')?.setValue(this.selectedContacts);
    }
    this.currentContact.setValue('');
  }

  // Supprime un contact sélectionné
  remove(contact: Contact) {
    if (!this.isOwner) return; // bloque la suppression si utisateur assigné
    this.selectedContacts = this.selectedContacts.filter(c => c.id !== contact.id);
    this.todoForm.get('membres')?.setValue(this.selectedContacts);
  }

  // Filtre les contacts pendant que l’utilisateur tape dans le champ
  onCurrentContactChange(value: string) {
    this.filteredContacts = this.allContacts.filter(user =>
      `${user.nom} ${user.prenom}`.toLowerCase().includes(value.toLowerCase())
    );
  }


  onDelete(id: number | null) {
    if (!id) return;

    this.userService.getUtilisateurConnecte().subscribe(currentUser => {
      // Vérifie le propriétaire
      if (this.todo.utilisateurId !== currentUser.id) {
        this.snackBar.open('❌ Vous ne pouvez pas supprimer cette tâche.', '', { duration: 2000, panelClass: ['snackbar-small-text'] });
        return; // stop ici si pas autorisé
      }

      // Si autorisé → suppression côté serveur
      this.todoService.deleteTodo(id).subscribe({
        next: (data) => {
          console.log('Tâche supprimée :', data);
          this.snackBar.open('Tâche supprimée', '', { duration: 1000, panelClass: ['snackbar-small-text'] });
          this.router.navigate(["/todolist"]);
        },
        error: (error) => {
          console.error("Erreur lors de la suppression :", error);
        }
      });
    });
  }



  //Partie mini messagerie
// Charger tous les messages d'une tâche
loadMessages() {

  // Appelle le backend via le service pour récupérer les messages du todo
  this.messageService.getMessages(this.todoId)

    // subscribe = "Quand la réponse arrive, exécute ce code"
    .subscribe(msgs => {

      // Remplace la liste de messages affichée par les messages reçus du backend
      this.messages = msgs;
    });
}



// Envoyer un message
sendMessage() {

  // trim() supprime les espaces au début/à la fin
  // → évite les messages vides du type "      "
  const content = this.newMessage.trim();

  // Si après trim le contenu est vide, on ne fait rien (annule l’envoi)
  if (!content) return;

  // Appelle le backend pour enregistrer le message
  this.messageService.sendMessage(this.todoId, content)

    // subscribe = on attend la réponse du backend
    .subscribe(msg => {

      // Ajoute le message renvoyé par le backend à la liste actuelle
      // → permet d'afficher immédiatement le message sans recharger toute la liste
      this.messages.push(msg);

      // Réinitialise le champ de texte du formulaire (efface l’input)
      this.newMessage = '';
    });
}

}




