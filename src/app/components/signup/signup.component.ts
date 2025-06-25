import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})



export class SignupComponent implements OnInit {

  listGenre=[
    {text:"femme", value:"f"},
    {text:"homme", value:"h"}
  ]

  signupForm!: FormGroup;

  constructor(private signupBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.signupBuilder.group( // group = ensemble cohérent de champs
      {
        username2: ["", [Validators.required]],
        password2: ["", [Validators.required]],
        name: ["", [Validators.required]],
        surname: ["", [Validators.required]]
      }
    );
  }

  onSubmit() {

    if(this.signupForm.valid) {
    console.log(this.signupForm.value)};
  }

}





