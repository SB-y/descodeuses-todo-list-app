import { Projet } from './projet.model';
import { Contact } from './contact.model';
import { Utilisateur } from './user.model';

export interface Todo {
    id: number | null; // null : champ optionnel
    title: string | null;
    completed: boolean | null;
    priorite: number | null;
    dueDate: string;
    textarea: string | null;
    membres?: Contact[];
    memberIds?: number[];
    projet?: Projet;
    projetId?: number | null;


    // Champs utilisateur
    utilisateurId?: number;
    name?: string;
    surname?: string;
    genre?: string;
    username?: string;
}


