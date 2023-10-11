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
  selector: 'app-cost-edit',
  templateUrl: './cost-edit.component.html',
  // styleUrls: ['./cost-edit.component.scss']
})
export class CostEditComponent implements OnInit {

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
  public EditForm!: FormGroup;
  public numRegex = /^-?\d*[.,]?\d{0,2}$/;

  public isProcess: boolean = false;
  public itemRef: any = null;

  @Output() EvenFrom_CostEdit_CloseFormEdit = new EventEmitter<boolean>(); // ส่ง param เพื่อสั่งให้ ปิดฟอร์ม edit
  @Output() reloadData = new EventEmitter<boolean>(); // ส่ง param เพื่อสั่งให้ cost-list reload
  @Input() costId:any; // input id from cost-list.component
  @Input() workId:any; // input work_id from cost-list.component

  public costType: any = null;
  // public workId: any = this.route.snapshot.paramMap.get('id');
  public token = localStorage.getItem('token');

  ngOnInit(): void {
    this.localeService.use('th'); // set ปฏิทินเป็น th

    this.costTypeService.getAll({ start: 0, limit: 100 }).subscribe(cus => {
      this.costType = cus;
      // console.log('costTypeList', this.costType);
    });

    this.EditForm = this.fb.group({
      costtype_id: this.fb.control('', [Validators.required]),
      cost_date: this.fb.control('', [Validators.required]),
      cost_detail: this.fb.control(null, []),
      cost_amount: this.fb.control(0, [Validators.required, Validators.pattern(this.numRegex)]),
    }); 
    
    this.service.get(this.costId).subscribe(res => {
      if (res.length > 0) {

        // this.editForm = true;
        this.itemRef = res[0];

        // Datepicker ไม่สามารถใช้กับ formControlName ได้ เลยต้องมาใช้ patchValue() แทน เพื่อให้ validate ได้
        this.EditForm.patchValue({
          cost_date: new Date(this.itemRef.cost_date),
          costtype_id: this.itemRef.costtype_id,
          cost_detail: this.itemRef.cost_detail,
          cost_amount: this.itemRef.cost_amount,
        });
        // console.log(res);

      } else {
        // this.editForm = false;
      }
    });

  }

  public async onSubmit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }


  async confirm() {

    let params = this.EditForm.value;
    this.isProcess = true;

    params.work_id = this.workId;
    params.cost_id = this.costId;
    params.token = this.token;

    // แปลง date format ก่อน update
    params.cost_date = this.datePipe.transform(params.cost_date, 'yyyy-MM-dd hh:mm:ss');

    await this.service.update(params).subscribe(res => {

      if (res.status) {
        this.modalRef.hide();
        this.toastr.success('แก้ไขค่าใช้จ่ายสำเร็จ!!');
        this.EditForm.reset();
        this.EvenFrom_CostEdit_CloseFormEdit.emit(); // ปิด form เพิ่มข้อมูล
        this.reloadData.emit(); // reload ข้อมูลใหม่
        this.isProcess = false;
      } else {
        this.modalRef.hide();
        this.toastr.error(res.message);
        this.EditForm.reset();
        this.isProcess = false;
      }
      // console.log(res);
    });

  }

  decline(): void {
    this.modalRef.hide();
  }

  CloseForm(){
    this.EvenFrom_CostEdit_CloseFormEdit.emit();
  }

}
