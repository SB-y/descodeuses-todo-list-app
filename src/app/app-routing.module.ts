import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TodoListComponent } from './components/todolist/todolist.component';
import { TododetailsComponent } from './components/tododetails/tododetails.component';
import { TodotableComponent } from './components/todotable/todotable.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalculetteComponent } from './calculette/calculette.component';
import { authGuard } from './auth/auth.guard/auth.guard';
import { ProjetdetailsComponent } from './components/projetdetails/projetdetails.component';
import { ProfilComponent } from './components/profil/profil.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { AdminGuard } from './auth/admin.guard/admin.guard.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';



const routes: Routes = [
  {
    path: "login", component: LoginComponent
  },
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "signup", component: SignupComponent 
  },
  { path: "profil", component: ProfilComponent, canActivate: [authGuard] }, 
  {
    path: "profil/:id", component: ProfilComponent, canActivate: [authGuard]
  },
  {
    path: "todolist", component: TodoListComponent, canActivate: [authGuard] 
  },
  {
    path: "tododetails/:id", component: TododetailsComponent, canActivate: [authGuard]
  },
  {
    path: "todotable", component: TodotableComponent, canActivate: [authGuard]
  },
  {
    path: "dashboard", component: DashboardComponent, canActivate: [authGuard]
  },
  {
    path: "calculette", component: CalculetteComponent, canActivate: [authGuard]
  },
  {
    path: "projetdetails/:id", component: ProjetdetailsComponent, canActivate: [authGuard]
  },

  {
    path: "logout", component: LogoutComponent, canActivate: [authGuard]
  },
  {
    path: "utilisateurs", component: UtilisateursComponent, canActivate: [AdminGuard]
  },
  {
    path:'contacts', 
    component: ContactsComponent, canActivate: [authGuard]
},

{
    path: 'contactdetails/:id',
    component: ContactDetailsComponent, canActivate: [authGuard]
    
}
];

export const MENU_ROUTES = [
  //{ path: '/login', title: 'Login' },
  //{ path: '/signup', title: 'Inscription' },
  { path: '/profil', title: 'Mon profil' },
  { path: '/dashboard', title: 'Mon dashboard' },
  { path: '/todolist', title: 'Ma to-do list' },
  { path: '/todotable', title: 'Mon récap' },
  //{ path: '/calculette', title: 'Calculatrice' },
  { path: '/contacts', title: 'Mes contacts' },
  { path: '/utilisateurs', title: 'Admin - Utilisateurs' },
  { path: '/logout', title: 'Logout' }
];

export const MENU_ROUTES2 = [
  { path: '/login', title: 'Login' },
  { path: '/signup', title: 'Création de compte' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
