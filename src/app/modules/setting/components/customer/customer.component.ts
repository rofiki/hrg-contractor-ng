import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { map, switchMap } from 'rxjs';
import { ParamMap } from '@angular/router';

import { AppService } from 'src/app/base/app.service';

//import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {


  constructor(private service: CustomerService) {}

  items: any;

  public user:any = null;
	public itemRef :any = null;

	public start : number = 0;
	public limit : number = 25;

	public isProcess:boolean = false;

	// public itemNew = {
	// 	id : 0, name : null, holiday : new Date
	// }



  ngOnInit(): void {
    this.listData();
  }

  listData() {}

}
