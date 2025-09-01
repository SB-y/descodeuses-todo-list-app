import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet, ROUTES } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthenService } from './auth/auth.guard/authen.service';
import { MENU_ROUTES, MENU_ROUTES2 } from './app-routing.module';
import { TodoService } from './services/todo.service';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Task & Talk';
  listMenu = MENU_ROUTES;
  listMenuPasLogged = MENU_ROUTES2;
  isMobile = window.innerWidth < 639; // seuil mobile
  topMenuOpen = false;


  constructor(
    public authService: AuthenService,
    private todoService: TodoService,
    private router: Router) { };


  // recherche
  rechercheTodo: string = '';
  suggestions: Todo[] = [];
  allTodos: Todo[] = [];


  ngOnInit() {
    // Charger toutes les tâches au démarrage
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.allTodos = todos;
    });
  }

  // @HostListener est un décorateur de méthode = écoute un événement sur l’élément hôte (ici window:resize) 
  // et appelle la méthode quand l’événement se produit.
  // ['$event'] passe l’objet événement à la méthode.

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 639; //event.target.innerWidth = largeur intérieure de la fenêtre au moment du redimensionnement
    if (!this.isMobile) this.topMenuOpen = false; // fermer le top-menu si on revient au desktop
  }

  // Pour la barre de recherche
  onSearchTodo() {
    if (!this.rechercheTodo.trim()) return;

    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      const match = todos.find(t =>
        t.title?.toLowerCase().includes(this.rechercheTodo.toLowerCase())
      );

      if (match) {
        this.router.navigate(['/tododetails', match.id]);
      } else {
        alert('Aucune tâche trouvée');
      }
    });
  }

  filtrerTodos() {
    const query = this.rechercheTodo.toLowerCase();

    this.suggestions = this.allTodos.filter(t =>
      t.title?.toLowerCase().includes(query)
    );
  }

  goToTodo(title: string) {
    const match = this.allTodos.find(t => t.title === title);
    if (match) {
      // Forcer un "refresh" en naviguant temporairement vers une route vide
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/tododetails', match.id]);
      });
    }
  }

}
