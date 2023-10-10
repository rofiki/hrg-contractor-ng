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
export class CostService {

  constructor(
    private http: HttpClient,
    private dbService: DbService,
    private baseService: BaseService,
    private app: AppService
  ) { }

  private apiUrl: string = this.dbService.getServiceURL() + '/cost';

  get(id: any): Observable<any> {
    //let headers = new HttpHeaders({ Authorization: "Bearer " });
    //return headers;
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  getByWorkId(id: any): Observable<any> {
    //let headers = new HttpHeaders({ Authorization: "Bearer " });
    //return headers;
    return this.http.get<any>(this.apiUrl + '/workid/' + id);
  }

  getAll(): Observable<any> {
    let headers = new HttpHeaders({ Authorization: "Bearer " });
    return this.http.get<any>(this.apiUrl);
  }

  public create(params: {}): Observable<any> {
    return this.http.post(this.apiUrl + '/', params);
  }

  public update(params: {}): Observable<any> {
    return this.http.put(this.apiUrl + '/', params);
  }

  public delete(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }

}
