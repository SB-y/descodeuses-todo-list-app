//AdminGuard (CanActivate) → Guard classique basé sur une classe qui protège les routes uniquement pour les admins, 
// en vérifiant isLoggedIn et le rôle "ROLE_ADMIN". Si ce n’est pas le cas, redirige vers /login.


import { Component, Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CanActivate, Router } from '@angular/router';
import { AuthenService } from '../auth.guard/authen.service';

@Component({
  selector: 'app-admin.guard',
  standalone: false,
  templateUrl: './admin.guard.component.html',
  styleUrl: './admin.guard.component.css'
})

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor( private authService: AuthenService, private router: Router) { }

  canActivate(): boolean {


    // Vérifie si utilisateur connecté + admin
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;
    }

    // sinon → redirection login
    this.router.navigate(['/login']);
    return false;
  
  }

}

