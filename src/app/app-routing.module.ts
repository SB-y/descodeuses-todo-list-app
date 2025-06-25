import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TodoListComponent } from './components/todolist/todolist.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { TododetailsComponent } from './components/tododetails/tododetails.component';
import { TodotableComponent } from './components/todotable/todotable.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalculetteComponent } from './calculette/calculette.component';
import { authGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path:"login", component:LoginComponent
  },
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path:"signup", component:SignupComponent, canActivate : [authGuard] // path correspond à la fin de l'URL
  },
  {
    path:"todolist", component:TodoListComponent, canActivate : [authGuard] // pour que la page todolist soit considérée comme index
  },
  {
    path:"userlist", component:UserlistComponent, canActivate : [authGuard]// pour que la page todolist soit considérée comme index
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
