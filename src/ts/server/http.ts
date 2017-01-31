import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpAPI {
    private jsonHeader: RequestOptions;
    constructor(private http: Http) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.jsonHeader = new RequestOptions({ headers: headers });
    }

    post(url: string, data: any, callback: Function, callbackError: Function): any {
        return this.http.post(url, data, this.jsonHeader).subscribe(
            response => callback(response),
            error => callbackError(error),
            () => console.log('Completed!')
        );
    }

    get(url: string, data: any, callback: Function, callbackError: Function): any {
        let options = url.indexOf('?') !== -1 ? '&' : '?';
        let result: string[] = [];
        if (data && Object.keys(data).length > 0) {
            for (let property in data)
                result.push(encodeURIComponent(property) + "=" + encodeURIComponent(data[property]));
            options += result.join("&");
        }
        return this.http.get(url + options, this.jsonHeader).subscribe(
            response => callback(response),
            error => callbackError(error),
            () => console.log('Completed!')
        );
    }
}
