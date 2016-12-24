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
            this.http.post('/api/login?rid=' + Math.random(), model, function (res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error || EMPTY_FUNCTION);
        },
        register: function (data, callback, error) {
            this.http.post('/api/register?rid=' + Math.random(), data, function (res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error || EMPTY_FUNCTION);
        },
        registerConfirm: function (confirmationKey, callback, error) {
            this.http.get('/api/register/confirm/' + confirmationKey + '?rid=' + Math.random(), {}, function (res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error || EMPTY_FUNCTION);
        },
        restore: function (data, callback, error) {
            this.http.post('/api/restore?rid=' + Math.random(), data, function (res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error || EMPTY_FUNCTION);
        },
        resetPassword: function (data, callback, error) {
            this.http.post('/api/reset-password?rid=' + Math.random(), data, function (res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error || EMPTY_FUNCTION);
        },
        logout: function (callback, error) {
            this.http.get('/api/logout?rid=' + Math.random(), {}, function (res) {
                callback(res._body);
            }, error || EMPTY_FUNCTION);
        }
    });

})(
    ng,
    window.app,
    app.Http
    );