import { Component, OnInit, TemplateRef } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { AppService } from 'src/app/base/app.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpHeaders } from '@angular/common/http';

//import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {


  constructor(
    private service: CustomerService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private appService: AppService
  ) { }

  public modalRef!: BsModalRef;
  public items: any = null;
  public isProcess: boolean = false;
  public idRef: any = null;

  public loading: boolean = true;

  public start: number = 0;
	public limit: number = 10;

  ngOnInit(): void {

    this.getItems();
    // let params = { search? : 'test_search', status?: 1, type?: 0, start : 0, limit : 25 }
    this.appService.getQueryString({ search: 'Rofiki Harong', start: this.start, limit : this.limit });

  }


  async getItems() {
    //let headers = new HttpHeaders({ Authorization : "Bearer " });
    //console.log(headers);
    await this.service.getAll().subscribe(
      res => {
        this.items = res;
        //console.log(this.items);
        this.loading = false;
        return this.items;
      }
    )

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
        this.getItems();
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

}
