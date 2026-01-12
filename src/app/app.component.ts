import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet, ROUTES } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthenService } from './auth/auth.guard/authen.service';
import { MENU_SECTIONS, MENU_PUBLIC } from './app-routing.module';
import { TodoService } from './services/todo.service';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WeDone';
  sections = MENU_SECTIONS;
  publicSections = MENU_PUBLIC;
  isMobile = window.innerWidth < 1024; // seuil mobile
  topMenuOpen = false;
  mobileAuth: 'login' | 'signup' | null = null;


  constructor(
    public authService: AuthenService,
    private todoService: TodoService,
    public router: Router) { };

    

  // recherche
  rechercheTodo: string = '';
  suggestions: Todo[] = [];
  allTodos: Todo[] = [];


  ngOnInit() {

     // N'appelle pas l'API si l'utilisateur n'est pas connecté !
  if (!this.authService.isLoggedIn()) {
    return;
  }

    // Lorsque l'utilisateur est connecté → on charge les todos
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.allTodos = todos;
    });
  }

  // @HostListener est un décorateur de méthode = écoute un événement sur l’élément hôte (ici window:resize) 
  // et appelle la méthode quand l’événement se produit.
  // ['$event'] passe l’objet événement à la méthode.

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 1024; //event.target.innerWidth = largeur intérieure de la fenêtre au moment du redimensionnement
    if (!this.isMobile) this.topMenuOpen = false; // fermer le top-menu si on revient au desktop
  }

  // Pour la barre de recherche
  onSearchTodo() {

    if (!this.authService.isLoggedIn()) {
      return;
    }

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

    if (!this.authService.isLoggedIn()) {
      return;
    }

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

//Pour les modales login et signup

openLogin() {
  this.mobileAuth = 'login';
}

openSignup() {
  this.mobileAuth = 'signup';
}

closeAuth() {
  this.mobileAuth = null;
}
}
