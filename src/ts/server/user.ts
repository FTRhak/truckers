import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpAPI } from './http';

@Injectable()
export class UserServer {
    constructor(private http: HttpAPI) { }

    getMe(model: any, callback: Function, error: Function): Observable<Response> {
        return this.http.post('/api/login?rid=' + Math.random(), JSON.stringify(model),
            function (res: any) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error);
    }
    getUser(model: any, callback: Function, error: Function): Observable<Response> {
        return this.http.get('/api/logout?rid=' + Math.random(), null,
            function (res: any) {
                if (res.status === 200) {
                    callback(res._body);
                }
            }, error);
    }
    editPersonalData(model: any, callback: Function, error: Function) {

    }

}
