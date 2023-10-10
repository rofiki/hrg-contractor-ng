import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
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
  public token = localStorage.getItem('token');
  public workId: any = this.route.snapshot.paramMap.get('id');

  public items: any = null;
  public isProcess: boolean = false;
  // public openFormCreate: boolean = false;


  ngOnInit():void {

    this.createForm = this.fb.group({
      costtype_id: this.fb.control('', [Validators.required]),
      cost_date: this.fb.control('', [Validators.required]),
      cost_detail: this.fb.control(null, []),
      cost_amount: this.fb.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      work_id: this.fb.control(this.workId, []),
      token: this.fb.control(this.token, []),
    });

  }

  public async onSubmit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  async confirm() {

    let params = this.createForm.value;
    this.isProcess = true;
    await this.service.create(params).subscribe(res => {

      if (res.status) {
        this.modalRef.hide();
        this.toastr.success(res.data.work_code, 'เพิ่มค่าใช้จ่ายสำเร็จ!!');
        this.createForm.reset();
        this.router.navigate(['/work/detail/' + res.data.work_id]);
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

}
