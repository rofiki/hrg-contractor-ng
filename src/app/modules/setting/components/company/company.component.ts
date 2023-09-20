import { Component, OnInit, TemplateRef } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppService } from 'src/app/base/app.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpHeaders } from '@angular/common/http';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {

  constructor(
    private service: CompanyService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private appService: AppService
  ) { }


  public modalRef!: BsModalRef;
  public itemRef: any = null;
  public length: number = 0;
  public isProcess: boolean = false;
  public idRef: any = null;

  public loading: boolean = true;

  public start: number = 0;
  public limit: number = 10;
  public search: string = '';

  ngOnInit(): void {

    this.getItems();
    
  }


  async getItems() {
    //  (params : { search? : string, status?: number, type?:number, start : number, limit : number })
    await this.service.getAll({ search: this.search, start: this.start, limit: this.limit }).subscribe(
      res => {
        console.log(res);
        
        this.itemRef = res;
        this.loading = false;
      }
    )

  }

  searchItems (search:string = '')
  {
    this.search = (search != '')? search : '';
    this.loading = true;
    this.getItems();
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

  public pageEventChange(start:number = 0, limit:number = 10, search:string = '') {

		this.isProcess = true;
    this.loading = true;

		// TODO : get all,
		this.service.getAll( { search: search, start : start , limit : limit }).subscribe({			

			next :  result => {
				this.itemRef = result;
	  
				// console.log(this.itemRef.data);		  
				this.isProcess = false;
        this.loading = false;

			  } ,
			error : refError => {
				console.log(refError);
				this.isProcess = false;
			  }
		})
		
	}

}
