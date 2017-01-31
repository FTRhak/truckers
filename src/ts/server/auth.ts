import { Injectable } from '@angular/core';
import { HttpAPI } from './http';

@Injectable()
export class AuthServer {
    constructor(private http: HttpAPI) { }

    login(model: any, callback: Function, error: Function): any {
        return this.http.post('/api/login?rid=' + Math.random(), JSON.stringify(model),
            function (res: any) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, function () { console.log(2); });
    }
}
