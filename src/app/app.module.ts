import { importProvidersFrom, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import {MatSelectModule} from '@angular/material/select';
import { TodoListComponent } from './components/todolist/todolist.component';
import {MatCardModule} from '@angular/material/card';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { UserlistComponent } from './components/userlist/userlist.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TododetailsComponent } from './components/tododetails/tododetails.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { TodotableComponent } from './components/todotable/todotable.component';
import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalculetteComponent } from './calculette/calculette.component';
import { CommonModule } from '@angular/common';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TodoListComponent,
    UserlistComponent,
    TododetailsComponent,
    TodotableComponent,
    DashboardComponent,
    CalculetteComponent,
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
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      { delay: 200 }
    ),
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableModule,
    CommonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr'},
    provideNativeDateAdapter(),
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
