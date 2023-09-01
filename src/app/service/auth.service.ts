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

  private apiUrl: string = this.dbService.getServiceURL() + '/users';

  GetAll() {
    return this.http.get(this.apiUrl)
  }

  GetByCode(code: any) {
    return this.http.get<any>(this.apiUrl + '?users_email=' + code);
  }

  GetById(id: any) {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  GetUserId() {
    return (sessionStorage.getItem('usersid') != null) ? sessionStorage.getItem('usersid')?.toString() : '';
  }

  IsloggedIn() : any {
      if(sessionStorage.getItem('usersrole') != null){

        if(sessionStorage.getItem('usersrole') == 'admin' || sessionStorage.getItem('usersrole') == 'user'){
          console.log('111',sessionStorage.getItem('usersrole'));
          return true;
        }else{
          console.log('222',sessionStorage.getItem('usersrole'));
          return false;
        }

      }else{
        console.log('333',sessionStorage.getItem('usersrole'));
        return false;
      }
    //return (sessionStorage.getItem('usersrole') != null) ? sessionStorage.getItem('usersrole')?.toString() : '';
  }

}
