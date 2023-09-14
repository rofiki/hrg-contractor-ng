import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { Observable, Subject, lastValueFrom } from 'rxjs';

// import { AppService } from '../base/app.service';
import { DbService } from '../base/db.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public udata: any;

  constructor(private http: HttpClient, private dbService: DbService) {

  }

  private apiUrl: string = this.dbService.getServiceURL() + '/users/auth';

  login(request: any) {

    return this.http.post(this.apiUrl, request,
      //  { withCredentials: true }
    );
  }

  fetch() {
    return this.http.get(this.apiUrl)
  }

  fetchs(request: any) {
    return this.http.get<any>(this.dbService.getServiceURL() + '/users', request);
  }

  fetchById(id: any) {
    return this.http.get<any>(this.dbService.getServiceURL() + '/users/' + id);
  }


  IsloggedIn(): any {

    return true;

  }

}
