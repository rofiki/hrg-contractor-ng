import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
// import { WorkService } from 'src/app/service/work.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { JsonPipe } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CostService } from 'src/app/service/cost.service';

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
    private modalService: BsModalService,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,
  ) {
    // const id: any = this.route.snapshot.paramMap.get('id');
  }

  public modalRef!: BsModalRef;
  public createForm!: FormGroup;
  // public token = localStorage.getItem('token');
  // public workId: any = this.route.snapshot.paramMap.get('id');

  public items: any = null;
  public isProcess: boolean = false;
  
  public openFormCreate: boolean = false; /* เปิดปิด ฟอร์มเพิ่ม Cost */
  @Output() reloadData = new EventEmitter<boolean>(); // ส่ง param เพื่อสั่งให้ cost-list reload


  public workId: any = this.route.snapshot.paramMap.get('id');
  public token = localStorage.getItem('token');

  ngOnInit():void {

    this.createForm = this.fb.group({
      costtype_id: this.fb.control('', [Validators.required]),
      cost_date: this.fb.control('', [Validators.required]),
      cost_detail: this.fb.control(null, []),
      cost_amount: this.fb.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    });

  }

  public async onSubmit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  async confirm() {
    let params = this.createForm.value;
    params.work_id = this.workId;
    params.token = this.token;
    this.isProcess = true;
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

  FormCreateCost (value:boolean){
    this.openFormCreate = value;
    // console.log(value)
  }

}
