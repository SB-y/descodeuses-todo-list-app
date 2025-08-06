import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TodoListComponent } from './components/todolist/todolist.component';
import { TododetailsComponent } from './components/tododetails/tododetails.component';
import { TodotableComponent } from './components/todotable/todotable.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalculetteComponent } from './calculette/calculette.component';
import { authGuard } from './auth/auth.guard';
import { ProjetdetailsComponent } from './components/projetdetails/projetdetails.component';
import { ProfilComponent } from './components/profil/profil.component';
import { LogoutComponent } from './components/logout/logout.component';


const routes: Routes = [
  {
    path:"login", component:LoginComponent
  },
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path:"signup", component:SignupComponent // path correspond à la fin de l'URL
  },
  {
    path:"todolist", component:TodoListComponent, canActivate : [authGuard] // pour que la page todolist soit considérée comme index
  },
  {
    path:"tododetails/:id", component:TododetailsComponent, canActivate : [authGuard] // pour que la page todolist soit considérée comme index
  },
  {
    path:"todotable", component:TodotableComponent, canActivate : [authGuard]
  },
  {
    path:"dashboard", component:DashboardComponent, canActivate : [authGuard]
  },
  {
    path:"calculette", component:CalculetteComponent, canActivate : [authGuard]
  },
  {
    path:"projetdetails/:id", component:ProjetdetailsComponent, canActivate : [authGuard]
  },
  {
    path:"profil/:id", component:ProfilComponent, canActivate : [authGuard]
  },
  {
    path:"logout", component:LogoutComponent, canActivate : [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
