import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  ) {

  
  }

  createForm!: FormGroup;
  submitted = false;

  ngOnInit() {
    this.createForm = this.fb.group({
      // email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
      name: this.fb.control('', Validators.required)
    });

  }

  onSubmit() {

  }

}
