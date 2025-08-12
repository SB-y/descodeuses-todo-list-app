import { Component } from '@angular/core';
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

  constructor(public authService: AuthenService) {};
}
