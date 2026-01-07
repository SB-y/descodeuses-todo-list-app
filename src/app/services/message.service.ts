// Permet d'envoyer des requêtes HTTP (GET, POST, etc.)
import { HttpClient } from '@angular/common/http';

// Permet de rendre le service injectable partout dans l'app
import { Injectable } from '@angular/core';

// Contient l'URL du backend (http://localhost:8081 ou ton URL Netlify/Render)
import { environment } from '../../environments/environment';

// Interface TypeScript représentant un message
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'  
  // → Angular crée une seule instance du service dans toute l'application
})
export class MessageService {

  // L'URL de base pour les messages (ex : http://localhost:8081/api/messages)
  private apiURL = environment.apiUrl + '/api/messages';

  // Injection de HttpClient dans le service (Angular s'en charge automatiquement)
  constructor(private http: HttpClient) {}

  /* 1. RÉCUPÉRER LES MESSAGES D’UNE TÂCHE
     - `todoId` = l’identifiant de la tâche (Action / Todo)
     - On appelle : GET /api/messages/{todoId}
     - Le backend renvoie un tableau d'objets Message → Message[]
     - this.http.get renvoie un Observable → Angular écoute la réponse
    */
  getMessages(todoId: number) {
    return this.http.get<Message[]>(`${this.apiURL}/${todoId}`);
  }

  /* 2. ENVOYER UN MESSAGE
     - Envoie un message pour une tâche donnée
     - Appelle : POST /api/messages/{todoId}
     - Le body contient juste le texte du message
     - Retourne l'objet Message créé par le backend
    */
  sendMessage(todoId: number, content: string) {
    return this.http.post<Message>(`${this.apiURL}/${todoId}`, content);
  }
}
