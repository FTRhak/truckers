/*global ng:true */

(function (ng, Component, PageTitle, Route, app, Server, AuthenticationService) {
    'use strict';

    let LoginPage = Component({
        selector: 'app-trucker',
        templateUrl: '/templates/authentication/login.html',
        directives: [ng.router.ROUTER_DIRECTIVES],
        providers: [PageTitle, Server, AuthenticationService]
    }).Class({
        constructor: [ng.router.Router, PageTitle, Server, AuthenticationService, function LoginPageConstructor(router, title, server, authServer) {
            title.setTitle("Login");
            if (server.user.isLogin()) {
                router.navigate(['Index']);
            }
            this.server = server;
            this.router = router;
            this.authServer = authServer;
            this.errorMessage = "";
        }],
        loginAccepted: function (res) {
            if (res.status && !res.error) {
                this.server.user.login(res.user);
                this.router.navigate(['UserProfile']);
            } else {
                this.errorMessage = res.error || "Error access";
            }
        },
        loginError: function () {
            console.warn('loginError: ', arguments[0]);
        },
        onSubmit: function (inputLogin, inputPassword) {
            this.errorMessage = "";
            const model = {
                login: inputLogin.value,
                password: inputPassword.value
            };
            let self = this;
            this.authServer.login(model, this.loginAccepted.bind(this), this.loginError.bind(this));
        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new Route({ path: '/login', component: LoginPage, name: 'Login' }));

})(
    ng,
    ng.core.Component,
    ng.platform.browser.Title,
    ng.router.Route,
    window.app,
    window.app.Server,
    window.app.AuthenticationService
    );