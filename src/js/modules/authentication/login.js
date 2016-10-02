/*global ng:true */

(function (ng, PageTitle, app, Server, AuthenticationServerComponent) {
    'use strict';

    let LoginComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/login.html',
        directives: [ng.router.ROUTER_DIRECTIVES],
        providers: [Server, AuthenticationServerComponent, PageTitle]
    }).Class({
        constructor: [Server, AuthenticationServerComponent, ng.router.Router, PageTitle, function LoginComponent(server, authServer, router, title) {
            if (server.user.isLogin()) {
                router.navigate(['Index']);
            }
            title.setTitle("Login");
            this.server = server;
            this.authServer = authServer;
            this.router = router;

            this.errorMessage = "";
            this.message = "";
        }],
        loginAccepted: function (data) {
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
        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/login', component: LoginComponent, name: 'Login' }));

})(
    ng,
    ng.platform.browser.Title,
    window.app,
    window.app.Server,
    window.app.AuthenticationServerComponent
    );