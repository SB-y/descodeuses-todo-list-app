import { importProvidersFrom, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { MatSelectModule } from '@angular/material/select';
import { TodoListComponent } from './components/todolist/todolist.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TododetailsComponent } from './components/tododetails/tododetails.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TodotableComponent } from './components/todotable/todotable.component';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalculetteComponent } from './calculette/calculette.component';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProjetdetailsComponent } from './components/projetdetails/projetdetails.component';
import { JwtInterceptor } from './auth/interceptors/jwt.interceptor';
import { ProfilComponent } from './components/profil/profil.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TodoListComponent,
    TododetailsComponent,
    TodotableComponent,
    DashboardComponent,
    CalculetteComponent,
    ProjetdetailsComponent,
    ProfilComponent,
    LogoutComponent,
    UtilisateursComponent,
    ContactsComponent,
    ConfirmationDialogComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService,
    //  { delay: 200 }
    // enlever les commentaires si pas de lien avec backend),
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableModule,
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule, ReactiveFormsModule,
    MatDialogModule,
    MatMenuModule,
    MatExpansionModule, 
    MatProgressSpinnerModule
    
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    provideNativeDateAdapter(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
    //  Version prof : provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
