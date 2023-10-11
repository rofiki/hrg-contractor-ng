import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
// import { WorkService } from 'src/app/service/work.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe, JsonPipe } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CostService } from 'src/app/service/cost.service';
import { CosttypeService } from 'src/app/service/costtype.service';

@Component({
  selector: 'app-cost-add',
  templateUrl: './cost-add.component.html',
  styleUrls: ['./cost-add.component.scss']
})
export class CostAddComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private service: CostService,
    private costTypeService: CosttypeService,
    private modalService: BsModalService,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  public modalRef!: BsModalRef;
  public createForm!: FormGroup;
  public numRegex = /^-?\d*[.,]?\d{0,2}$/;

  public items: any = null;
  public isProcess: boolean = false;

  public openFormCreate: boolean = false; /* เปิดปิด ฟอร์มเพิ่ม Cost */
  @Output() reloadData = new EventEmitter<boolean>(); // ส่ง param เพื่อสั่งให้ cost-list reload

  public costType: any = null;
  public workId: any = this.route.snapshot.paramMap.get('id');
  public token = localStorage.getItem('token');

  ngOnInit(): void {

    this.createForm = this.fb.group({
      costtype_id: this.fb.control('', [Validators.required]),
      cost_date: this.fb.control('', [Validators.required]),
      cost_detail: this.fb.control(null, []),
      cost_amount: this.fb.control(0, [Validators.required, Validators.pattern(this.numRegex)]),
    });

    this.costTypeService.getAll({ start: 0, limit: 100 }).subscribe(cus => {
      this.costType = cus;
    });

    this.localeService.use('th'); // set ปฏิทินเป็น th

  }

  public async onSubmit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  async confirm() {

    let params = this.createForm.value;
    this.isProcess = true;

    params.work_id = this.workId;
    params.token = this.token;

    // แปลง date format ก่อน update
    params.cost_date = this.datePipe.transform(params.cost_date, 'yyyy-MM-dd hh:mm:ss');

    await this.service.create(params).subscribe(res => {

      if (res.status) {
        this.modalRef.hide();
        this.toastr.success('เพิ่มค่าใช้จ่ายสำเร็จ!!');
        this.createForm.reset();
        this.FormCreateCost(false); // ปิด form เพิ่มข้อมูล
        this.reloadData.emit(); // reload ข้อมูลใหม่
        this.isProcess = false;
      } else {
        this.modalRef.hide();
        this.toastr.error(res.message);
        this.createForm.reset();
        this.isProcess = false;
      }
      // console.log(res);
    });

  }

  decline(): void {
    this.modalRef.hide();
  }

  /* แสดง/ซ่อมฟอร์มเพิ่ม */
  FormCreateCost(value: boolean) {
    this.openFormCreate = value;
  }

}
