import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { DbService } from '../base/db.service';
import { AppService } from '../base/app.service';
import { BaseService } from '../base/base.service';

import { switchMap, map, tap } from 'rxjs/operators';
import { Observable, Subject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private dbService: DbService, private baseService: BaseService) {
    // console.log(this.baseService.getToken());
  }

  private apiUrl: string = this.dbService.getServiceURL() + '/customers';

  // public get(id: number): Observable<any> {

  //   if (!id || id == 0) {
  //     throw new Error('Invalid areaId');
  //   }

  //    let token: string = this.baseService.getToken();
  //    let headers = new HttpHeaders({ Authorization: "Bearer " + token });

  //   return this.http.get(this.apiUrl + id.toString(), {});
  // }

  get(id: any): Observable<any> {
    //let headers = new HttpHeaders({ Authorization: "Bearer " });
    //return headers;
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  getAll(): Observable<any> {
    //let headers = new HttpHeaders({ Authorization: "Bearer " });
    //return headers;
    return this.http.get<any>(this.apiUrl);
  }

  getByCondition(search = {}): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  public create(params: {}) : Observable<any>{
		return this.http.post( this.apiUrl + '/' , params);
	}


}
