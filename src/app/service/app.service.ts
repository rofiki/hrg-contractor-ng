import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { 
    this.dbService = environment.dbService;
  }

  public dbService : string = "http://localhost:3000";
}
