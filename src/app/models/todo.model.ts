export interface Todo {
    id:number | null; // null : champ optionnel
    title:string | null;
    completed: boolean | null;
    priorite:number| null;
    dueDate: string;
    textarea: string | null;
}


