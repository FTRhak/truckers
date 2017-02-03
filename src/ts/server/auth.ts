import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpAPI } from './http';
import { SuccessResponse, UserLoginModel, RegistrationModel } from './../interfaces';

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

    login(model: UserLoginModel, callback: Function, error: Function): Observable<Response> {
        return this.http.post('/api/login?rid=' + Math.random(), JSON.stringify(model),
            function (res: Response) {
                if (res.status === 200) {
                    callback(res.json());
                } else {
                    error(res)
                }
            }, error);
    }
    logout(model: any, callback: Function, error: Function): Observable<Response> {
        return this.http.get('/api/logout?rid=' + Math.random(), null,
            function (res: Response) {
                if (res.status === 200) {
                    callback(res.json());
                }
            }, error);
    }
    register(model: RegistrationModel, callback: Function, error: Function): Observable<Response> {
        return this.http.post('/api/register?rid=' + Math.random(), model,
            function (res: Response) {
                if (res.status === 200) {
                    callback(res.json());
                }
            }, error);
    }
    registerConfirm(key: string, callback: Function, error: Function): Observable<Response> {
        const md5 = /^[a-f0-9]{32}$/;
        if (!md5.test(key)) {
            callback({ status: false, data: "VL-1" });
            return;
        }
        return this.http.get('/api/register/confirm/' + key + '?rid=' + Math.random(), null,
            function (res: Response) {
                if (res.status === 200) {
                    callback(res.json());
                }
            }, error);
    }
    restore(model: any, callback: Function, error: Function): Observable<Response> {
        return this.http.post('/api/restore?rid=' + Math.random(), model,
            function (res: Response) {
                if (res.status === 200) {
                    callback(res.json());
                } else {
                    error(res)
                }
            }, error);
    }
    resetPassword(model: any, callback: Function, error: Function) {

    }

}
