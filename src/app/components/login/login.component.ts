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
    private apiService: ApiService,
  ) {

    if (localStorage.getItem('role') != null) {
      const role = localStorage.getItem('role');
      this.router.navigate([role]);
    }else{
      localStorage.clear();
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
      password: this.fb.control('', Validators.required)
    });

  }
  // add user เฉยๆ เดียวก็ลบ
  // regis() {
  //   this.authService.regis1().subscribe(res => { console.log(res) })
  // }

  logout() {
    localStorage.clear();
    if (localStorage.getItem('role') == null) {
      this.toastr.error('', 'คุณได้ออกจากระบบแล้ว');
      this.router.navigate(['login']);
    }
  }

  onSubmit() {

    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value).subscribe(data => {
        this.users = data
        // console.log(this.users);
        if (this.users.status) {

          localStorage.setItem('firstname', this.users.ufirstname);
          localStorage.setItem('lastname', this.users.ulastname);
          localStorage.setItem('email', this.users.uemail);
          localStorage.setItem('token', this.users.token);
          localStorage.setItem('logintime', this.users.logintime);
          localStorage.setItem('role', this.users.role);

          if (this.users.role == 'admin') {
            this.router.navigate(['/admin']);
          } else if (this.users.role == 'user') {
            this.router.navigate(['/user']);
          } else {
            localStorage.clear();
            // console.log('เปลี่ยนหน้าไม่ได้ ',this.users.role);
            this.router.navigate(['/login']);
          }

          this.toastr.success('ชื่อของคุณคือ: ' + this.users.ufirstname + ' ' + this.users.ulastname, 'เข้าสู่ระบบสำเร็จ!!');
        } else {
          this.toastr.error("อีเมล์หรือรหัสผ่านไม่ถูกต้อง");
        }
      });

    }

  }

}
