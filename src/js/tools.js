/*global ng:true */

(function (ng, app) {
    'use strict';

    app.Http = ng.core.Injectable({}).Class({
        //https://www.youtube.com/watch?v=L7xPwhwbcHE
        constructor: [ng.http.Http, ng.router.Router, function AjaxClass(http, router) {
            const headers = new ng.http.Headers({ 'Content-Type': 'application/json' });
            const jsonHeader = new ng.http.RequestOptions({ headers: headers });

            
            this.post = function (url, data, successCallback, errorCallback) {
                return http.post(url, JSON.stringify(data), jsonHeader).toPromise()
                    .then(successCallback)
                    .catch(errorCallback || function () { 
                        router.navigate(['Login']);
                    });
            };

            this.get = function (url, data, success, error) {
                let options = url.indexOf('?') !== -1 ? '&' : '?';
                let result = [];
                if (Object.keys(data).length > 0) {
                    for (let property in data) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(data[property]));
                    options += result.join("&");
                }
                return http.get(url + options).toPromise()
                    .then(success)
                    .catch(error || function () { 
                        router.navigate(['Login']);
                        localStorage.removeItem('user');
                     });
            };
        }]

    });

    var userData = null;
    let Auth = ng.core.Injectable({
        providers: [app.Http]
    }).Class({
        constructor: [app.Http, function AuthUser(http) {
            this.http = http;
        }],

        synchronizeUser : function () {
            let self = this;
            if (this.isLogin()) {
                this.http.get('/api/access?rid=' + Math.random(), {}, function (res) {
                    const body = JSON.parse(res._body);
                    self.login(body.user);
                }, function (error) {
                    self.logout();
                });
            }
        },
        /**
         * @return {bool}
         */
        isLogin: function () {
            //return userData && userData._id;
            return !!(localStorage.getItem('user'));
        },
        getUser: function() {
            //return userData;
            return JSON.parse(localStorage.getItem('userData'));
        },
        login: function (user) {
            localStorage.setItem('user', user._id);
            userData = user;
            localStorage.setItem('userData', JSON.stringify(user));
        },
        logout: function () {
            userData = null;
            localStorage.removeItem('user');
            localStorage.removeItem('userData');
        }
    });

    app.Auth = Auth;


    class LocalStorage{
        constructor () {
            var data = {};
            this.setData = function (key, value) {
                data[key] = value;
            };
            this.getData = function (key) {
                return data[key];
            };
        }

    }


    app.Server = ng.core.Injectable({
        providers: [app.Http, Auth]
    }).Class({
        constructor: [app.Http, Auth, function ServerClass(http, user) {
            this.http = http;
            this.user = user;
            this.storage = new LocalStorage();
        }]
    });

})(ng, window.app || (window.app = {}));