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
    private datePipe: DatePipe
  ) { 
    const id: any = this.route.snapshot.paramMap.get('id');
  }

  public modalRef!: BsModalRef;
  public EditForm!: FormGroup;
  public token = localStorage.getItem('token');

  // public id:any;
  public items: any = null;
  public isProcess: boolean = false;
  public cusItems: any = null;
  public editForm: boolean = true;  
  public itemRef :any;

  public statusList = this.service.statusList();
  public yearList = this.service.yearList();

  public work_job_start:any;

  ngOnInit() {

    console.log(this.statusList);
    this.localeService.use('th');

    this.customerService.getAll({start: 0, limit: 100}).subscribe(cus => {
      this.cusItems = cus;
    });

    this.EditForm = this.fb.group({
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
      work_status: this.fb.control('', []),
      token: this.fb.control(this.token, []),
    });

    this.route.params.subscribe(params => {
      this.service.get(params['id']).subscribe(res => {

        if (res.length > 0) {

          this.editForm = true;
          this.itemRef = res[0];
          this.itemRef.work_job_start = this.datePipe.transform(res[0].work_job_start, 'dd/MM/yyyy');
          this.itemRef.work_job_finish = this.datePipe.transform(res[0].work_job_finish, 'dd/MM/yyyy');
          console.log('itemRef',this.itemRef);
          // this.work_job_start = this.formattedDate(res.work_job_start);
          // this.EditForm.patchValue({

          //   id: res.id,
          //   work_code: res.work_code,
          //   address: res.address,
          //   address2: res.address2,
          //   phone: res.phone,
          //   vatNumber: res.vatNumber
          // });
          console.log(res);
        } else {
          this.editForm = false;
        }

        //console.log('res = ', res);
      });
    });

  }

  public async onSubmit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  async confirm() {

    let value = this.EditForm.value;
    this.isProcess = true;

    await this.service.update(value).subscribe(res => {
      if (res.status) {
        this.modalRef.hide();
        this.toastr.success('', 'แก้ไขข้อมูลสำเร็จ!!');
        this.router.navigate(['/work/detail/' + res.data.work_id]);
      } else {
        this.modalRef.hide();
        this.toastr.error('แก้ไขข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        this.EditForm.reset();
        this.isProcess = false;
      }
    });

  }

  decline(): void {
    this.modalRef.hide();
  }

}
