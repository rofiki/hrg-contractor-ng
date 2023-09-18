import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';

import { firstValueFrom, lastValueFrom, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private service: CustomerService,
    private route: ActivatedRoute
  ) { 
    const id:any = this.route.snapshot.paramMap.get('id');
   }

  public EditForm!: FormGroup;

  //id:any = this.route.snapshot.paramMap.get('id');
  public items: any = null;
  public user: any = null;
  public isProcess:boolean = false;
  public loading: boolean = true;

  

  ngOnInit() {
    const id:any = this.route.snapshot.paramMap.get('id');
    
    this.EditForm = this.fb.group({
      // email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
      name: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      vatNumber: this.fb.control('', [Validators.pattern("^[0-9]*$")]),
      address2: this.fb.control('', [])
    });

    // if(id){
    //   this.service.get(id).subscribe({
    //     next: param =>{
    //       if(param.length != 0){
    //         this.isProcess = true;
    //         console.log('true',param);

    //         this.items = param;
    //       }else{
    //         this.isProcess = false;
    //         console.log('false',param);
    //       }
    //       console.log(param);
    //     }
    //   });
    // }
    this.getItems(id);
  }

  getItems(id:any) {

    // this.loading = 'loading...';
    this.service.get(id).subscribe(
      res => {
        //this.loading = 'loading...';
        this.items = res[0];
        //console.log(this.items);
        //console.log(this.items.address);
        this.loading = false;
       // return this.items;
      }
    )
     let test = lastValueFrom(this.service.get(id)).then(data =>{
      this.items = data[0];
      console.log('data',this.items.name);
    });
     //console.log('test',test);
 
   }

  public async onSubmit() {

    // let params = this.EditForm.value;

    // let confirmResult = confirm('ยืนยันเพื่มข้อมูลบริษัทผู้จ้าง (ลูกค้า)');
    // if(confirmResult){
    //   await this.service.create(params).subscribe(res => {

    //     if(res.status){
    //       this.toastr.success(res.data.name, 'เพิ่มข้อมูลบริษัทผู้จ้าง (ลูกค้า) สำเร็จ!!');
    //       this.router.navigate(['/setting/customer']);
    //     }else{
    //       this.toastr.error('เพิ่มข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    //       this.EditForm.reset();
    //     }
    //     //console.log(res);
    //   });
    // }
  }

}
