import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { WorkService } from 'src/app/service/work.service';
import { CustomerService } from 'src/app/service/customer.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { JsonPipe } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-work-add',
  templateUrl: './work-add.component.html',
  styleUrls: ['./work-add.component.scss'],
})
export class WorkAddComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private service: WorkService,
    private customerService: CustomerService,
    private modalService: BsModalService,
    private localeService: BsLocaleService
  ) { }


  public modalRef!: BsModalRef;
  public createForm!: FormGroup;
  public token = localStorage.getItem('token');

  public items: any = null;
  public isProcess: boolean = false;
  public cusItems: any = null;

  public statusList = this.service.statusList();

  ngOnInit() {

    this.createForm = this.fb.group({
      work_code: this.fb.control('', [Validators.required]),
      customer_id: this.fb.control('', [Validators.required]),
      work_year: this.fb.control('2023', []),
      work_place: this.fb.control('', []),
      work_detail: this.fb.control('', []),
      work_job_start: this.fb.control('', [Validators.required]),
      work_job_finish: this.fb.control('', []),
      work_place_start: this.fb.control('', []),
      work_place_start_latlong: this.fb.control('', []),
      work_place_end: this.fb.control('', []),
      work_place_end_latlong: this.fb.control('', []),
      work_distance: this.fb.control('', [Validators.pattern("^[0-9]*$")]),
      work_price: this.fb.control('', [Validators.pattern("^[0-9]*$")]),
      work_note: this.fb.control('', []),
      work_status: this.fb.control('', [Validators.required]),
      token: this.fb.control(this.token, []),
    });

    this.customerService.getAll({start: 0, limit: 100}).subscribe(cus => {
      this.cusItems = cus;
    });

    this.localeService.use('th');
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
        this.toastr.success(res.data.work_code, 'เพิ่มข้อมูลสำเร็จ!!');
        this.router.navigate(['/work/detail/' + res.data.work_id]);
      }else{
        this.modalRef.hide();
        this.toastr.error('เพิ่มข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        this.createForm.reset();
        this.isProcess = false;
      }
      console.log(res);
    });

  }
 
  decline(): void {
    this.modalRef.hide();
  }

}
