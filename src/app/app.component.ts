import { Component, HostListener } from '@angular/core';
import { RouterOutlet, ROUTES } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AuthenService } from './auth/auth.guard/authen.service';
import { MENU_ROUTES, MENU_ROUTES2 } from './app-routing.module';

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

  constructor(public authService: AuthenService) {};


  // @HostListener est un décorateur de méthode = écoute un événement sur l’élément hôte (ici window:resize) 
  // et appelle la méthode quand l’événement se produit.
  // ['$event'] passe l’objet événement à la méthode.

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 639; //event.target.innerWidth = largeur intérieure de la fenêtre au moment du redimensionnement
    if (!this.isMobile) this.topMenuOpen = false; // fermer le top-menu si on revient au desktop
  }
}
