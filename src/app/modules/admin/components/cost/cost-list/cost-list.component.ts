import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  public idRef: any = null;

  public loading: boolean = true;

  public workId: any = this.route.snapshot.paramMap.get('id');
  

  // คำนวณค่าใช้จ่าย
  public workPrice :number = 0; // ราคางาน
  public sumCost:number = 0; // รวมค่าใช้จ่าย
  public netProfit:number = 0; // กำไรสุทธิ

@Input() step:number = 1;


  ngOnInit(): void {
    this.getItems();
  }

  async getItems() {
    await this.service.getByWorkId(this.workId).subscribe(
      res => {
        this.workService.get(this.workId).subscribe(work => {
          this.workPrice = work[0].work_price;
        });

        this.itemRef = res;

        // รวมค่าใช้จ่าย
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
    console.log(this.loading);
  }

}
