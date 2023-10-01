import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { DbService } from '../base/db.service';
import { AppService } from '../base/app.service';
import { BaseService } from '../base/base.service';
import { AuthService } from './auth.service';

import { switchMap, map, tap, count } from 'rxjs/operators';
import { Observable, Subject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private dbService: DbService,
    private baseService: BaseService,
    private app: AppService,
  ) { }

  private apiUrl: string = this.dbService.getServiceURL() + '/work';

  get(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  getAll(params: { search?: string, status?: number, type?: number, start: number, limit: number }): Observable<any> {
    // let headers = new HttpHeaders({ Authorization: "Bearer " });
    return this.http.get<any>(
      this.apiUrl + this.app.getQueryString(params)
    );
  }

  public create(params: {}): Observable<any> {
    console.log('param = ', params);

    return this.http.post(this.apiUrl + '/', params);
  }

  public test(params: {}) {
    const token = localStorage.getItem('token');
    console.log('token=', token);
    console.log('params=', params);
  }

  public update(params: {}): Observable<any> {
    return this.http.put(this.apiUrl + '/', params);
  }

  public delete(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }

  public statusList() {
    return [
      { 'value': '0', 'label': 'กำลังดำเนินการ' },
      { 'value': '1', 'label': 'เสร็จแล้ว' },
      { 'value': '2', 'label': 'ยกเลิก' }
    ];
  }

  public yearList() {
    const d = new Date();
    let startYear: number = 2016;
    let thisYear: number = d.getFullYear();
    let year: any = [];
    while (startYear <= thisYear) {
      year.push({ 'value': startYear++, 'label': startYear++ })
    }
    return year;
  }


}
