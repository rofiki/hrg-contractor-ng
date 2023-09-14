import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class DbService {

  constructor() { }

  public getServiceURL () : string {
    return "http://localhost:8000/api";
  }

  public getJsonServerURL () : string {
    return "http://localhost:3000";
  }
  
}
