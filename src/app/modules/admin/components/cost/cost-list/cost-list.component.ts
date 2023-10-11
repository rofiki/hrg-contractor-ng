import { Component, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppService } from 'src/app/base/app.service';

import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { HttpHeaders } from '@angular/common/http';
import { CostService } from 'src/app/service/cost.service';
import { WorkService } from 'src/app/service/work.service';

@Component({
  selector: 'app-cost-list',
  templateUrl: './cost-list.component.html',
  // styleUrls: ['./cost-list.component.scss']
})
export class CostListComponent implements OnInit {

  constructor(
    private service: CostService,
    private workService: WorkService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private appService: AppService
  ) { }

  public modalRef!: BsModalRef;
  public itemRef: any = null;
  public isProcess: boolean = false;
  public idRef: any = null; // id สำหรับ delete

  public loading: boolean = true; /* แสดง loading */
  public openFormEdit: boolean = false; /* เปิดปิด ฟอร์มเพิ่ม Cost */
  public idEditRef: any = null;

  public workId: any = this.route.snapshot.paramMap.get('id');
  public token = localStorage.getItem('token');
  

  /* คำนวณค่าใช้จ่าย */
  public sumCost:number = 0; // รวมค่าใช้จ่าย
  public netProfit:number = 0; // กำไรสุทธิ

  @Input() getWorkPrice:number = 0; // รับค่า work_price จาก work-detail.componant
  @Input() showListAfterCreate:boolean = false; // reload list หลังจาก เพิ่มข้อมูล

  ngOnInit(): void {
    this.getItems();
  }

  async getItems() {

    this.loading = true;
    this.openFormEdit = false;

    await this.service.getByWorkId(this.workId).subscribe(
      res => {
        this.itemRef = res;

        // รวมค่าใช้จ่าย
        this.sumCost = 0;
        for(let i = 0; i < this.itemRef.data.length; i++){
          this.sumCost += this.itemRef.data[i].cost_amount;
        }
        this.loading = false;
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

  public loadingShow(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

    /* แสดง/ซ่อมฟอร์มแก้ไข */
    FormEdit(id:any) {
      this.openFormEdit = true;
      this.idEditRef = id;
    }
  
    reloadData(){
      this.getItems();
    }

    EvenFrom_CostEdit_CloseFormEdit(){
      this.openFormEdit = false;
    }

}
