import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  constructor(private route: ActivatedRoute ){}

  public id:any;

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
  }

  chkLogin(){
    
  }

  onSubmit(){

  }

}
