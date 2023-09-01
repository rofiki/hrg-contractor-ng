import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }

  public getServiceURL () : string {
    return "http://localhost:3000";
  }
  
}
