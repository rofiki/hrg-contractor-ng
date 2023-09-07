import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppService } from '../base/app.service';
import { DbService } from '../base/db.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private dbService: DbService) {

  }

  private apiUrl: string = this.dbService.getServiceURL() + '/users/auth';

  // regis1(){
  //   let password = 'asdfghjkl';
  //   let post:any = {
  //     "firstname": 'Rofiki',
  //     "lastname": 'Harong',
  //     "email": "vidocq.hrg@gmail.com",
  //     "password": password,
  //     "role": "admin",
  //   };
  //   return this.http.post(this.dbService.getServiceURL() + '/users', post);
  // }

  login(request: any) {

    return this.http.post(this.apiUrl, request, 
      //  { withCredentials: true }
      );
  }

  GetAll() {
    return this.http.get(this.apiUrl)
  }

  GetByCode(code: any) {
    return this.http.get<any>(this.apiUrl + '?users_email=' + code);
  }

  GetById(id: any) {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  GetByToken(token: any) {
    return this.http.get<any>(this.apiUrl + '/' + token);
  }

  search(request:any){
    return this.http.get<any>(this.dbService.getServiceURL() + '/users/search' , request);
  }

  GetUserId() {
    return (localStorage.getItem('usersid') != null) ? localStorage.getItem('usersid')?.toString() : '';
  }

  IsloggedIn(): any {

    const token:any = localStorage.getItem('token');
    const token_db:any = this.search({'search': '999'});

    console.log(this.dbService.getServiceURL() + '/users/search');
    // if(token_db != token){
    //   return token_db;
    // }
    return true;

    // if(localStorage.getItem('token') != null){ // chk token null
    //   let ttt:any = this.GetByToken('');
    // }
    // if (localStorage.getItem('role') != null) {

    //   if (localStorage.getItem('role') == 'admin' || localStorage.getItem('role') == 'user') {
    //     return true;
    //     //return localStorage.getItem('token');
    //   } else {
    //     return false;
    //   }

    // } else {
    //   return false;
    // }

  }

}
