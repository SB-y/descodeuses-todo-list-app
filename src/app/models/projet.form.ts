import { FormControl} from "@angular/forms";

// on crée un formulaire typé pour pouvoir récupérer les valeurs saisies

export interface ProjetForm {
    id: FormControl<number | null>;
    title: FormControl<string | null>;
    description: FormControl<string | null>;
  }
