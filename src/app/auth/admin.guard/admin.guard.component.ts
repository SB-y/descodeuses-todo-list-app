import { Component, Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CanActivate, Router } from '@angular/router';

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


  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean {

    const role = localStorage.getItem('role');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn && role === "ROLE_ADMIN") {
      return true
    }

    else {
      this.router.createUrlTree(["/login"]);
      return false;
    }
  }

}

