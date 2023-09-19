import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';

import { firstValueFrom, lastValueFrom, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private service: CustomerService,
    private route: ActivatedRoute
  ) {
    const id: any = this.route.snapshot.paramMap.get('id');
  }

  public EditForm!: FormGroup;

  public items: any = null;
  public isProcess: boolean = false;
  public loading: boolean = true;



  ngOnInit() {

    this.EditForm = this.fb.group({
      // email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
      name: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      vatNumber: this.fb.control('', [Validators.pattern("^[0-9]*$")]),
      address2: this.fb.control('', [])
    });

    this.route.params.subscribe(params => {
      this.service.get(params['id']).subscribe(res => {

        res = res[0];
        this.EditForm.patchValue({

          name: res.name,
          address: res.address,
          address2: res.address2,
          phone: res.phone,
          vatNumber: res.vatNumber
        });

        //console.log('res = ', res);
      });
    });

  }

  public async onSubmit() {

    // let params = this.EditForm.value;

    // let confirmResult = confirm('ยืนยันเพื่มข้อมูลบริษัทผู้จ้าง (ลูกค้า)');
    // if(confirmResult){
    //   await this.service.create(params).subscribe(res => {

    //     if(res.status){
    //       this.toastr.success(res.data.name, 'เพิ่มข้อมูลบริษัทผู้จ้าง (ลูกค้า) สำเร็จ!!');
    //       this.router.navigate(['/setting/customer']);
    //     }else{
    //       this.toastr.error('เพิ่มข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    //       this.EditForm.reset();
    //     }
    //     //console.log(res);
    //   });
    // }
  }

}
