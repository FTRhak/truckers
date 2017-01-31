import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class HttpAPI {
    private jsonHeader: RequestOptions;
    constructor(private http: Http) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.jsonHeader = new RequestOptions({ headers: headers });
    }

    post(url: string, data: any, callback: Function, callbackError: Function): Observable<Response> {
        let response = this.http.post(url, data, this.jsonHeader);
        response.subscribe(
            response => callback(response),
            error => callbackError(error),
            () => console.log('Completed!')
        );
        return response;
    }

    get(url: string, data: any, callback: Function, callbackError: Function): Observable<Response> {
        let options = url.indexOf('?') !== -1 ? '&' : '?';
        let result: string[] = [];
        if (data && Object.keys(data).length > 0) {
            for (let property in data)
                result.push(encodeURIComponent(property) + "=" + encodeURIComponent(data[property]));
            options += result.join("&");
        }
        let response =  this.http.get(url + options, this.jsonHeader);
        response.subscribe(
            response => callback(response),
            error => callbackError(error),
            () => console.log('Completed!')
        );
        return response;
    }
}
