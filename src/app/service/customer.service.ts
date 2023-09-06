import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DbService } from '../base/db.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient, private dbService: DbService) { }

  private apiUrl: string = this.dbService.getServiceURL() + '/api/customer';

  listCustomer(){
    return this.http.get<any>(this.apiUrl);
  }
}
