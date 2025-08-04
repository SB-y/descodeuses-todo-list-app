import { FormControl} from "@angular/forms";

// on crée un formulaire typé pour pouvoir récupérer les valeurs saisies

export interface ContactForm {
    id: FormControl<number | null>;
    prenom: FormControl<string | null>;
    nom: FormControl<string | null>;
    image: FormControl<string | null>;
    email: FormControl<string | null>;
    tel: FormControl<string | null>;
  }



