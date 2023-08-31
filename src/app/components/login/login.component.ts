import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

// import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
// import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  //loginForm!: FormGroup;
  submitted = false;
  public isProcess:boolean = false;

  constructor(
    // library: FaIconLibrary,
    private router: Router,
    private fb: FormBuilder) {
      // library.addIconPacks(fas);
  }

  loginForm = this.fb.group({
    email:this.fb.control('',Validators.compose([Validators.required,Validators.email])),
    password:this.fb.control('',Validators.required)
  });


  
 
  ngOnInit() {
    //  this.loginForm = this.fb.group({
    //    email: ['', Validators.required,Validators.email],
    //    password: ['', Validators.required]
    //  });

  }

  onSubmit() {
    if(this.loginForm.valid) {
      console.log('validx');
      console.log(this.loginForm.get('email')?.errors);

    }else{
      console.log('in validx');
      console.log(this.loginForm.get('email')?.errors);
    }

  }

  get email(){
    return this.loginForm.get('email');
  }

}
