/*global ng:true */

(function (ng, PageTitle, app, Server, AuthenticationServerComponent) {
    'use strict';

    let ResetPasswordComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/reset_password.html',
        directives: [ng.router.ROUTER_DIRECTIVES],
        providers: [Server, AuthenticationServerComponent, PageTitle]
    }).Class({
        constructor: [Server, AuthenticationServerComponent, ng.router.Router, PageTitle, function ResetPasswordComponent(server, authServer, router, title) {
            /*if (server.user.isLogin()) {
                router.navigate(['Login']);
            }*/
            title.setTitle("Reset password");
            this.authServer = authServer;
            this.resetCompleted = false;
            this.errorMessage = "";

        }],
        resetAccepted: function (data) {
            console.log('resetAccepted:', data);
            this.restoreCompleted = true;
        },
        resetError: function (data) {
            console.warn('resetError: ', data);
            this.errorMessage = "Error";
        },
        onSubmit: function (inputPassword, inputPasswordConfirm) {
            var password = inputPassword.value;
            var passwordConfirm = inputPasswordConfirm.value;

            this.authServer.resetPassword({ password: password }, this.resetAccepted.bind(this), this.resetError.bind(this));
        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/reset/', component: ResetPasswordComponent, name: 'ResetPassword' }));

})(
    ng,
    ng.platform.browser.Title,
    window.app,
    window.app.Server,
    window.app.AuthenticationServerComponent
    );