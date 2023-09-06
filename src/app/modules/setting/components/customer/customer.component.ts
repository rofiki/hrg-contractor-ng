import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService:CustomerService,){}
  
  customer:any;

  ngOnInit(): void{
    this.showCustomer();
  }

  
  showCustomer (){
    this.customer = this.customerService.listCustomer().subscribe(customer =>{
      this.customer = customer;
      console.log(this.customer);
    });
  }

}
