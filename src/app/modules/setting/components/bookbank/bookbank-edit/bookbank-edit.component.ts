import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { BookbankService } from 'src/app/service/bookbank.service';

import { firstValueFrom, lastValueFrom, Observable, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bookbank-edit',
  templateUrl: './bookbank-edit.component.html',
  styleUrls: ['./bookbank-edit.component.scss']
})
export class BookbankEditComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private service: BookbankService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {
    const id: any = this.route.snapshot.paramMap.get('id');
  }

  public modalRef!: BsModalRef;
  public EditForm!: FormGroup;

  // public items: any = null;
  public isProcess: boolean = false;
  public editForm: boolean = true;

  ngOnInit() {

    this.EditForm = this.fb.group({
      id: this.fb.control('', []),
      bookbank_name: this.fb.control('', [Validators.required]),
      bookbank_number: this.fb.control('', [Validators.required]),
      bookbank_branch: this.fb.control('', [])
    });

    this.route.params.subscribe(params => {
      this.service.get(params['id']).subscribe(res => {

        if (res.length > 0) {

          this.editForm = true;
          res = res[0];
          console.log(res);
          this.EditForm.patchValue({

            id: res.id,
            bookbank_name: res.bookbank_name,
            bookbank_number: res.bookbank_number,
            bookbank_branch: res.bookbank_branch,

          });
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
        this.toastr.success('', 'แก้ไขข้อมูลบริษัทผู้จ้าง (ลูกค้า) สำเร็จ!!');
        this.router.navigate(['/setting/bookbank']);
      } else {
        this.modalRef.hide();
        this.toastr.error('เพิ่มข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        this.EditForm.reset();
        this.isProcess = false;
      }
    });

  }

  decline(): void {
    this.modalRef.hide();
  }

}
