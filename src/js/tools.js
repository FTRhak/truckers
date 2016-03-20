/*global ng:true */

(function(app) {
    'use strict';
    app.tools = {
        location: {
            go: function(path) {
                setTimeout(function() {
                    let a = document.createElement('a');
                    a.href = '#' + path;
                    a.click();
                    a.remove();
                }, 0);
            }
        }
    };

    app.Http = ng.core.Injectable({}).Class({
        constructor: [ng.http.Http, function AjaxClass(http) {
            const headers = new ng.http.Headers({ 'Content-Type': 'application/json' });
            const jsonHeader = new ng.http.RequestOptions({ headers: headers });

            this.post = function(url, data, success, error) {
                http.post(url, JSON.stringify(data), jsonHeader).toPromise()
                    .then(success)
                    .catch(error || function() { app.tools.location.go('/login'); });
            };
        }]

    });


    app.Auth = ng.core.Injectable({
        providers: [app.Http]
    }).Class({
        constructor: [app.Http, function AuthUser(http) {
            let self = this;

            this.synchronizeUser = function() {
                http.post('/api/user/access?rid=' + Math.random(), {}, function(res) {
                    self.login(res.id);
                }, function(error) {
                    self.loguot();
                });
            }
        }],
        /**
         * @return {bool}
         */
        isLogin: function() {
            return !!localStorage.getItem('user');
        },
        login: function(id) {
            localStorage.setItem('user', id);
        },
        loguot: function() {
            localStorage.removeItem('user');
        }
    });

})(window.app || (window.app = {}));