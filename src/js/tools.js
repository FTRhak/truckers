/*global ng:true */

(function (ng, app) {
    'use strict';
    app.tools = {
        location: {
            go: function (path) {
                setTimeout(function () {
                    let a = document.createElement('a');
                    a.href = '#' + path;
                    a.click();
                    a.remove();
                }, 0);
            }
        }
    };

    app.Http = ng.core.Injectable({}).Class({
        constructor: [ng.http.Http, ng.router.Router, function AjaxClass(http, router) {
            const headers = new ng.http.Headers({ 'Content-Type': 'application/json' });
            const jsonHeader = new ng.http.RequestOptions({ headers: headers });

            
            this.post = function (url, data, success, error) {
                http.post(url, JSON.stringify(data), jsonHeader).toPromise()
                    .then(success)
                    .catch(error || function () { 
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
                http.get(url + options).toPromise()
                    .then(success)
                    .catch(error || function () { app.tools.location.go('/login'); });
            };
        }]

    });


    let Auth = ng.core.Injectable({
        providers: [app.Http]
    }).Class({
        constructor: [app.Http, function AuthUser(http) {
            let self = this;

            this.synchronizeUser = function () {
                http.post('/api/user/access?rid=' + Math.random(), {}, function (res) {
                    self.login(res.id);
                }, function (error) {
                    self.loguot();
                });
            }
        }],
        /**
         * @return {bool}
         */
        isLogin: function () {
            return !!(localStorage.getItem('user') * 1);
        },
        login: function (id) {
            localStorage.setItem('user', id);
        },
        loguot: function () {
            localStorage.removeItem('user');
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