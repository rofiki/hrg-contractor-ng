import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DbService } from '../base/db.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient, private dbService: DbService) { }

  private apiUrl: string = this.dbService.getServiceURL() + '/customers';

  get(){
    return this.http.get<any>(this.apiUrl);
  }

  getById(id:any){
    return this.http.get<any>(this.apiUrl);
  }
}
