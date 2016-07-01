/*global ng:true */

(function (ng, app) {
    'use strict';

    app.LoginComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/login.html',
        directives: [ng.router.ROUTER_DIRECTIVES],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Location, ng.router.Router, function LoginComponent(server, location, router) {
            if (server.user.isLogin()) {
                app.tools.location.go('/');
            }
            this.errorMessage = "";
            this.model = {
                login: "",
                password: ""
            };
            this.message = "";

            this.onSubmit = function () {
                const self = this;
                console.log('model:', this.model);
                server.http.post('/api/user/login?rid=' + Math.random(), this.model, function (res) {
                    if (res.status === 200) {
                        const body = JSON.parse(res._body);
                        if (body.status === 200) {
                            server.user.login(body.user.uid);
                            //TODO bugfix location.go('/user');
                            app.tools.location.go('/user');
                        } else {
                            self.errorMessage = body.error;
                        }
                    }
                });
            }
        }]
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/login', component: app.LoginComponent, name: 'Login' }));

})(ng, window.app || (window.app = {}));