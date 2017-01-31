import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpAPI } from './http';

@Injectable()
export class AuthServer {
    constructor(private http: HttpAPI) { }

    synchronizeUser() {
        let self = this;
        if (this.isLogin()) {
            this.http.get('/api/access?rid=' + Math.random(), {}, function (res: any) {
                const body = JSON.parse(res._body);
                self.setUser(body.user);
            }, function (error: any) {
                self.removeUser();
            });
        }
    }

    isLogin() {
        return !!(localStorage.getItem('user'));
    }
    getUser() {
        return JSON.parse(localStorage.getItem('userData'));
    }
    setUser(user: any) {
        localStorage.setItem('user', user._id);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    removeUser() {
        localStorage.removeItem('user');
        localStorage.removeItem('userData');
    }
    //---------------------------------------------

    login(model: any, callback: Function, error: Function): Observable<Response> {
        return this.http.post('/api/login?rid=' + Math.random(), JSON.stringify(model),
            function (res: any) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error);
    }
    logout(model: any, callback: Function, error: Function): Observable<Response> {
        return this.http.get('/api/logout?rid=' + Math.random(), null,
            function (res: any) {
                if (res.status === 200) {
                    callback(res._body);
                }
            }, error);
    }
    register(model: any, callback: Function, error: Function) {

    }
    registerConfirm(model: any, callback: Function, error: Function) {

    }
    restore(model: any, callback: Function, error: Function) {

    }
    resetPassword(model: any, callback: Function, error: Function) {

    }

}
