
import { FormControl} from "@angular/forms";

// on crée un formulaire typé pour pouvoir récupérer les valeurs saisies

export interface Todoform {
    id:FormControl<number | null>; // null : champ optionnel
    title:FormControl<string | null>;
    completed: FormControl<boolean | null>;
    priorite:FormControl<number | null>;
    dueDate: FormControl<Date | null>;
}


