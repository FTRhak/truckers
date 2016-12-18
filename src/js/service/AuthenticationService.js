/*global ng:true */

(function (ng, app, Http) {
    'use strict';

    const EMPTY_FUNCTION = function () { };

    app.AuthenticationService = ng.core.Component({
        providers: [Http]
    }).Class({
        constructor: [Http, function AuthenticationService(http) {
            this.http = http;
        }],
        login: function (data, callback, error) {
            const model = {
                login: data.login,
                password: data.password
            };
            this.http.post('/api/user/login?rid=' + Math.random(), model, function (res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error || EMPTY_FUNCTION);
        },
        register: function (data, callback, error) {
            this.http.post('/api/user/register?rid=' + Math.random(), data, function (res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error || EMPTY_FUNCTION);
        },
        restore: function (data, callback, error) {
            this.http.post('/api/user/restore?rid=' + Math.random(), data, function (res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error || EMPTY_FUNCTION);
        },
        resetPassword: function (data, callback, error) {
            this.http.post('/api/user/reset-password?rid=' + Math.random(), data, function (res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error || EMPTY_FUNCTION);
        },
        logout: function (callback, error) {
            this.http.post('/api/logout?rid=' + Math.random(), {}, callback, error || EMPTY_FUNCTION);
        }
    });

})(
    ng, 
    window.app,
    app.Http
    );