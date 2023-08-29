import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  submitted = false;
  public isProcess:boolean = false;

  constructor(
    library: FaIconLibrary,
    private router: Router,
    private fb: FormBuilder) {
      library.addIconPacks(fas);
  }

  
 
  ngOnInit() {
     this.loginForm = this.fb.group({
       email: ['', Validators.required],
       password: ['', Validators.required]
     });

  }

  onSubmit() {
    console.log(this.loginForm.value.email);
    // this.submitted = true;

     if (this.loginForm.invalid) {
       return
     }

  }

}
