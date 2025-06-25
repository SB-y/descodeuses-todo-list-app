import { FormControl} from "@angular/forms";

// on crée un formulaire typé pour pouvoir récupérer les valeurs saisies

export interface Userform {
    id:FormControl<number | null>;
    prenom:FormControl<string | null>; // null : champ optionnel
    nom:FormControl<string | null>;
    sexe: FormControl<boolean | null>;
}


