import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });
  //loginForm!=FormGroup;
  loginForm!: FormGroup
  submitted = false;

  constructor(
    library: FaIconLibrary,
    private router: Router,
    private formBuilder: FormBuilder) {
    library.addIconPacks(fas);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    //console.log(this.loginForm.value.email);
    this.submitted = true;

    if (this.loginForm.invalid) {
      return
    }
  }

}
