import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Rx"
import 'rxjs/Rx';

@Injectable()
export class HttpService {
	
	constructor(private http: HttpClient) {}
	
	private httpOptions = {
		'Content-Type': 'application/json'
	}
	
	public get(url):any {
		return this.http.get(url)
			.map(res => res)
			.catch(err => Observable.throw(err.error))
	}
	
}