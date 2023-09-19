import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { AppService } from 'src/app/base/app.service';

//import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {


  constructor(private service: CustomerService, private route: ActivatedRoute) { }

  public items: any = null;
  public user: any = null;
  public isProcess: boolean = false;

  public loading: boolean = true;

  // public itemNew = {
  // 	id : 0, name : null, holiday : new Date
  // }



  ngOnInit(): void {

    // let id = this.route.snapshot.params['id'];

    // this.service.get().subscribe(
    //   res => {
    //     this.items = res;
    //     console.log(this.items);
    //     return this.items;
    //   }
    // );

    this.getItems();
  }

  async getItems() {

    await this.service.getAll().subscribe(
      res => {
        this.items = res;
        //console.log(this.items);
        this.loading = false;
        return this.items;
      }
    )

  }

}
