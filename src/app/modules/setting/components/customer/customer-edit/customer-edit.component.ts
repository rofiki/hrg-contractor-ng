import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';

import { firstValueFrom, lastValueFrom, Observable, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private service: CustomerService,
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
      // email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
      id: this.fb.control('', []),
      name: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      vatNumber: this.fb.control('', [Validators.pattern("^[0-9]*$")]),
      address2: this.fb.control('', [])
    });

    this.route.params.subscribe(params => {
      this.service.get(params['id']).subscribe(res => {

        if (res.length > 0) {

          this.editForm = true;
          res = res[0];
          this.EditForm.patchValue({

            id: res.id,
            name: res.name,
            address: res.address,
            address2: res.address2,
            phone: res.phone,
            vatNumber: res.vatNumber

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
        this.router.navigate(['/setting/customer']);
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
