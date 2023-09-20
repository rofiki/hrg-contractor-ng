import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public getQueryString(conditions: any) {
    
    let paramsUrl: string = "";

    if (conditions != null) {
      let params = Object.keys(conditions);
      for (let param of params) {

        if (conditions[param] != null) {
          if (paramsUrl == "") {
            paramsUrl += "?";
          } else {
            paramsUrl += "&";
          }
          let paramValue: string = encodeURIComponent(conditions[param]);
          paramsUrl += param + "=" + paramValue;
        }
      }
    }
    // console.log('paramsUrl = ', paramsUrl);
    return paramsUrl;
  }

}
