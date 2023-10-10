import { Component, OnInit, TemplateRef } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppService } from 'src/app/base/app.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

import { HttpHeaders } from '@angular/common/http';
import { WorkService } from 'src/app/service/work.service';
// import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class WorkDetailComponent implements OnInit {

  constructor(
    private service: WorkService,
    // private customerService: CustomerService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private appService: AppService
  ) { }

  public modalRef!: BsModalRef;

  public length: number = 0;
  public isProcess: boolean = false;
  public loading: boolean = true;

  public idRef: any = null;
  public itemRef: any = null;

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.service.get(params['id']).subscribe(res => {

        if (res.length > 0) {
          this.itemRef = res[0];
          console.log(this.itemRef);
        } else {
          console.log('error log 1');
        }
      });
    });

  }

  public async openModal_delete(template: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.idRef = id;

    //this.confirm(id);
  }

  async confirm(id: any) {

    this.isProcess = true;

    this.service.delete(id).subscribe(res => {
      if (res.status) {
        this.modalRef.hide();
        this.toastr.success('', 'ลบข้อมูลสำเร็จ สำเร็จ!!');
        // this.getItems();
        this.isProcess = false;
      } else {
        this.modalRef.hide();
        this.toastr.error('ลบข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        this.isProcess = false;
      }
    });

  }

  decline(): void {
    this.modalRef.hide();
  }

  public pageEventChange(start: number = 0, limit: number = 10, search: string = '') {

    this.isProcess = true;
    this.loading = true;

    // TODO : get all,
    this.service.getAll({ search: search, start: start, limit: limit }).subscribe({

      next: result => {
        this.itemRef = result;

        // console.log(this.itemRef.data);		  
        this.isProcess = false;
        this.loading = false;

      },
      error: refError => {
        console.log(refError);
        this.isProcess = false;
      }
    })

  }

  // btn_back(search: string = '', start: number = 0, limit: number = 10) {
  //   console.log({ search: search, start: start, limit: limit });
  // }

}
