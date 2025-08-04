import { FormControl} from "@angular/forms";

// on crée un formulaire typé pour pouvoir récupérer les valeurs saisies

export interface UtilisateurForm {
    id: FormControl<number | null>;
    name: FormControl<string | null>;
    surname: FormControl<string | null>;
    genre: FormControl<string | null>;
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }
