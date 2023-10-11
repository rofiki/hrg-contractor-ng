import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { WorkService } from 'src/app/service/work.service';
import { CustomerService } from 'src/app/service/customer.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe, JsonPipe } from '@angular/common';
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
    private localeService: BsLocaleService,
    private datePipe: DatePipe,
  ) { }


  public modalRef!: BsModalRef;
  public createForm!: FormGroup;
  public numRegex = /^-?\d*[.,]?\d{0,2}$/;
  

  public items: any = null;
  public isProcess: boolean = false;
  public cusItems: any = null;
  public token = localStorage.getItem('token');

  public statusList = this.service.statusList();

  ngOnInit() {

    this.createForm = this.fb.group({
      work_code: this.fb.control('', [Validators.required]),
      customer_id: this.fb.control('', [Validators.required]),
      work_year: this.fb.control('2023', [Validators.required]),
      work_place: this.fb.control('', []),
      work_detail: this.fb.control('', []),
      work_job_start: this.fb.control('', [Validators.required]),
      work_job_finish: this.fb.control('', []),
      work_place_start: this.fb.control('', []),
      work_place_start_latlong: this.fb.control('', []),
      work_place_end: this.fb.control('', []),
      work_place_end_latlong: this.fb.control('', []),
      work_distance: this.fb.control(0, [Validators.pattern(this.numRegex)]),
      work_price: this.fb.control(0, [Validators.pattern(this.numRegex)]),
      work_note: this.fb.control('', []),
      work_status: this.fb.control('', [Validators.required]),
      // token: this.fb.control(this.token, []),
    });

    this.customerService.getAll({ start: 0, limit: 100 }).subscribe(cus => {
      this.cusItems = cus;
    });

    this.localeService.use('th'); // set ปฏิทินเป็น th
  }

  public async onSubmit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  async confirm() {

    let params = this.createForm.value;
    params.token = this.token;
    this.isProcess = true;

    // แปลง date format ก่อน update
    params.work_job_start = this.datePipe.transform(params.work_job_start, 'yyyy-MM-dd hh:mm:ss');
    params.work_job_finish = this.datePipe.transform(params.work_job_finish, 'yyyy-MM-dd hh:mm:ss');
    console.log(params);

    await this.service.create(params).subscribe(res => {

      if (res.status) {
        this.modalRef.hide();
        this.toastr.success(res.data.work_code, 'เพิ่มข้อมูลสำเร็จ!!');
        this.router.navigate(['/work/detail/' + res.data.work_id]);
      } else {
        this.modalRef.hide();
        this.toastr.error(res.message);
        this.createForm.reset();
        this.isProcess = false;
        console.log(params);
      }
      console.log(res);
    });

  }

  decline(): void {
    this.modalRef.hide();
  }

}
