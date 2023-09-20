import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.scss']
})
export class CompanyAddComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private service: CompanyService,
    private modalService: BsModalService
  ) { }

  public modalRef!: BsModalRef;
  public createForm!: FormGroup;

  public id:any;
  public items: any = null;
  public isProcess: boolean = false;

  ngOnInit() {

    this.createForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      address: this.fb.control('', []),
      phone: this.fb.control('', []),
      idcard: this.fb.control('', []),
      vatNumber: this.fb.control('', [])
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
        this.toastr.success(res.data.name, 'เพิ่มข้อมูล สำเร็จ!!');
        this.router.navigate(['/setting/company']);
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