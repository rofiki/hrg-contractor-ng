import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { WorkService } from 'src/app/service/work.service';
import { CustomerService } from 'src/app/service/customer.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe, JsonPipe } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-work-edit',
  templateUrl: './work-edit.component.html',
  styleUrls: ['./work-edit.component.scss']
})
export class WorkEditComponent implements OnInit {


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private service: WorkService,
    private customerService: CustomerService,
    private modalService: BsModalService,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) { 
    // const id: any = this.route.snapshot.paramMap.get('id');
  }

  public modalRef!: BsModalRef;
  public EditForm!: FormGroup;
  public numRegex = /^-?\d*[.,]?\d{0,2}$/;

  public token = localStorage.getItem('token');
  public id: any = this.route.snapshot.paramMap.get('id');

  public items: any = null;
  public isProcess: boolean = false;
  public cusItems: any = null;
  public editForm: boolean = true;  
  public itemRef :any;

  public statusList = this.service.statusList();
  public yearList = this.service.yearList();

  ngOnInit() {

    this.localeService.use('th');

    this.customerService.getAll({start: 0, limit: 100}).subscribe(cus => {
      this.cusItems = cus;
    });

    this.EditForm = this.fb.group({
      work_code: this.fb.control(null, [Validators.required]),
      customer_id: this.fb.control(null, [Validators.required]),
      work_year: this.fb.control(null, []),
      work_place: this.fb.control(null, []),
      work_detail: this.fb.control(null, []),
      work_job_start: this.fb.control(null, [Validators.required]),
      work_job_finish: this.fb.control(null, []),
      work_place_start: this.fb.control(null, []),
      work_place_start_latlong: this.fb.control(null, []),
      work_place_end: this.fb.control(null, []),
      work_place_end_latlong: this.fb.control(null, []),
      work_distance: this.fb.control(null, [Validators.pattern(this.numRegex)]),
      work_price: this.fb.control(null, [Validators.pattern(this.numRegex)]),
      work_note: this.fb.control(null, []),
      work_status: this.fb.control(null, []),
      token: this.fb.control(null, []),
      work_id: this.fb.control(null, []),
      
    });

      this.service.get(this.id).subscribe(res => {
        if (res.length > 0) {

          this.editForm = true;
          this.itemRef = res[0];

          // Datepicker ไม่สามารถใช้กับ formControlName ได้ เลยต้องมาใช้ patchValue() แทน เพื่อให้ validate ได้
          this.EditForm.patchValue({
            work_job_start: new Date(this.itemRef.work_job_start),
            work_job_finish: new Date(this.itemRef.work_job_finish),
          });
          console.log(res);

        } else {
          this.editForm = false;
        }
      });

  }

  public async onSubmit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  async confirm() {

    let value = this.EditForm.value;
    this.isProcess = true;

    // แปลง date format ก่อน update
    value.work_job_start = this.datePipe.transform(value.work_job_start, 'yyyy-MM-dd hh:mm:ss');
    value.work_job_finish = this.datePipe.transform(value.work_job_finish, 'yyyy-MM-dd hh:mm:ss');

    await this.service.update(value).subscribe(res => {
      if (res.status) {
        this.modalRef.hide();
        this.toastr.success(res.message);
        this.router.navigate(['/work/detail/' + res.data.work_id]);
      } else {
        this.modalRef.hide();
        this.toastr.error(res.message);
        // this.EditForm.reset();
        this.isProcess = false;
      }
       console.log('update res=', res);
    });

  }

  decline(): void {
    this.modalRef.hide();
  }

}
