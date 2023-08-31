import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {

  }

  apiUrl = 'http://localhost:3000/users';
  // apiUrl = this.appService + '/' + 'users';

  GetAll() {
    return this.http.get(this.apiUrl)
  }

  GetByCode(code: any) {
    return this.http.get<any>(this.apiUrl + '?users_email=' + code);
  }

  LoginProcess(inputData: any) {

  }
}
