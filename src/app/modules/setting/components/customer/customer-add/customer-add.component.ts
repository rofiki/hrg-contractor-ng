import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {

  
  }

  createForm!: FormGroup;
  submitted = false;

  ngOnInit() {

    //this.authService.IsloggedIn();
    //console.log(this.authService.IsloggedIn());

    this.createForm = this.fb.group({
      // email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
      name: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      phonenumber: this.fb.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      vatNumber: this.fb.control('', [Validators.pattern("^[0-9]*$")]),
      address2: this.fb.control('', [])
    });

  }

  onSubmit() {
    console.log(this.createForm.value);
  }

}
