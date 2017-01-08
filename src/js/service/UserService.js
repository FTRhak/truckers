/*global ng:true */

(function (ng, app, Http) {
    'use strict';

    const EMPTY_FUNCTION = function () { };

    app.UserService = ng.core.Component({
        providers: [Http]
    }).Class({
        constructor: [Http, function UserService(http) {
            this.http = http;
        }],
        getMe: function (callback, error) {
            this.http.post('/api/user/?rid=' + Math.random(), {}, function (res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error || EMPTY_FUNCTION);
        },
        getUser: function (data, callback, error) {
            const model = {
                login: data.login,
                password: data.password
            };
            this.http.post('/api/user/?rid=' + Math.random(), model, function (res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error || EMPTY_FUNCTION);
        },
        editPersonalData: function (model, callback, error) {
            this.http.post('/api/user/edit/personaldata?rid=' + Math.random(), model, function (res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    callback(body);
                }
            }, error || EMPTY_FUNCTION);
        }

    });

})(
    ng,
    window.app,
    app.Http
    );