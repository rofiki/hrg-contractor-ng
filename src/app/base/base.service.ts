import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BaseService  {

	private tokenName : string = "token";

	constructor() { }	

  public setToken(token : string) : void {
		localStorage.setItem(this.tokenName, token);
	}

	public getToken() : string {
		let token = localStorage.getItem(this.tokenName);
		if (token != null)
			return token;
		
		return "";
	}

	// public getServiceURL() : string {				
	// 	return this.baseServiceUrl;
	// }

	public getQueryString(conditions: any) 
	{
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
		return paramsUrl;
	}



	public getTokenName() : string{
		return this.tokenName;
	}


}
