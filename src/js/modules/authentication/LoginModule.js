/*global ng:true */

(function (ng, Component, PageTitle, Route, app, Server, AuthenticationService) {
    'use strict';

    let LoginPage = Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/login.html',
        directives: [ng.router.ROUTER_DIRECTIVES],
        providers: [PageTitle]
    }).Class({
        constructor: [ng.router.Router, PageTitle, function LoginPageConstructor(router, title) {
            title.setTitle("Login");
            /*if (server.user.isLogin()) {
                router.navigate(['Index']);
            }
            title.setTitle("Login");
            this.server = server;
            this.authServer = authServer;
            this.router = router;

            this.errorMessage = "";
            this.message = "";*/
        }],
        /*loginAccepted: function (data) {
            if (data.status === 200) {
                this.server.user.login(data.user.uid);
                this.router.navigate(['UserProfile']);
            } else {
                this.errorMessage = data.error;
            }
        },
        loginError: function (data) {
            console.warn('loginError: ', data);
        },
        onSubmit: function (inputLogin, inputPassword) {
            const model = {
                login: inputLogin.value,
                password: inputPassword.value
            };
            let self = this;
            this.authServer.login(model, this.loginAccepted.bind(this), this.loginError.bind(this));
    }*/
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