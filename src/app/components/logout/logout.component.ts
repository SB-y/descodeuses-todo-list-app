import { Component } from '@angular/core';
import { AuthenService } from '../../auth/authen.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {


  constructor(
    private authService: AuthenService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.authService.logout();
    this.snackBar.open('Déconnexion réussie', '', { duration: 2000 });
    this.router.navigate(['/login']);
  }
}
