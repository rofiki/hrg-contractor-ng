import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss'],

})
export class CustomerAddComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private service: CustomerService,
    private modalService: BsModalService,

  ) { }

  public modalRef!: BsModalRef;
  public createForm!: FormGroup;

  public id:any;
  public items: any = null;
  public isProcess: boolean = false;

  ngOnInit() {

    this.createForm = this.fb.group({
      // email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
      name: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      vatNumber: this.fb.control('', [Validators.pattern("^[0-9]*$")]),
      address2: this.fb.control('', [])
    });

  }

  public async onSubmit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  async confirm() {

    let params = this.createForm.value;
    this.isProcess = true;

    await this.service.create(params).subscribe(res => {

      if(res.status){
        this.modalRef.hide();
        this.toastr.success(res.data.name, 'เพิ่มข้อมูลบริษัทผู้จ้าง (ลูกค้า) สำเร็จ!!');
        this.router.navigate(['/setting/customer']);
      }else{
        this.modalRef.hide();
        this.toastr.error('เพิ่มข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        this.createForm.reset();
        this.isProcess = false;
      }
      //console.log(res);
    });

  }
 
  decline(): void {
    this.modalRef.hide();
  }

}