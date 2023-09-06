import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  public users: any;
  public isProcess: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private apiService:ApiService,
    ) {
    //sessionStorage.clear();

    if (sessionStorage.getItem('usersrole') != null) {
      const role = sessionStorage.getItem('usersrole');
      this.router.navigate([role]);
    }

    //  if(this.authService.GetRole() != null)
    //  {
    //    this.router.navigate(this.authService.GetRole());
    //  }

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
      password: this.fb.control('', Validators.required)
    });

  }

  onSubmit() {

    if (this.loginForm.valid) {

      this.authService.GetByCode(this.loginForm.value.email).subscribe(data => {
        
        this.users = data;
        this.users = (this.users.length > 0) ? this.users[0] : '';

        if (this.users.users_password === this.loginForm.value.password) {

          if (this.users.isactive) {

            sessionStorage.setItem('usersname', this.users.users_email);
            sessionStorage.setItem('usersid', this.users.id);
            sessionStorage.setItem('usersrole', this.users.users_role);

            if (this.users.users_role == 'admin') {
              this.router.navigate(['/admin']);
            } else if (this.users.users_role == 'user') {
              this.router.navigate(['/user']);
            } else {

            }
            this.toastr.success('อีเมล์ของคุณ: ' + this.loginForm.value.email, 'เข้าสู่ระบบสำเร็จ!!');
          } else {
            this.toastr.error('กรุณาติดต่อผู้ดูแลระบบ อีเมล์:vidocq.hrg@gmail.com', 'ผู้ใช้งานนี้ถูกระงับ');
          }
        } else {
          this.toastr.error("อีเมล์หรือรหัสผ่านไม่ถูกต้อง");
        }
      });
    }

  }

}
