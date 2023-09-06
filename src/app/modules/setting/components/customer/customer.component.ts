import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {

  constructor(private service:CustomerService,){}
  
  items:any;

  ngOnInit(): void{
    this.listData();
  }

  // customerObs = this.http.get<Response>('https://randomuser.me/api/?format=json')
  // .pipe(map(i => i.results))
  
  listData (){

    this.items = this.service.get().subscribe(res =>{
      this.items = res;
      console.log(this.items);
    });

  }

}
