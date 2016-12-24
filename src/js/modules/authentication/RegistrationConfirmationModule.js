/*global ng:true */

(function (ng, PageTitle, app, Server, AuthenticationService) {
    'use strict';

    let RegistrationConfirmationPage = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: '/templates/authentication/register_confirmation.html',
        directives: [ng.common.CORE_DIRECTIVES, ng.common.FORM_DIRECTIVES, ng.router.ROUTER_DIRECTIVES],
        providers: [Server, AuthenticationService, PageTitle]
    }).Class({
        constructor: [ng.router.Router, ng.router.RouteParams, PageTitle, Server, AuthenticationService, function RegistrationConfirmationPageConstructor(router, route, title, server, authServer) {
            if (server.user.isLogin()) {
                router.navigate(['Index']);
            }
            title.setTitle("Register Confirmation");
            this.confirmationKey = route.params.key;

            this.authServer = authServer;
        }],
        confirmAccepted: function (res) {
            if (res.status && !res.error) {
                this.server.user.login(res.user);
                this.router.navigate(['Login']);
            } else {
                this.errorMessage = res.error || "Error access";
            }
        },
        confirmError: function () {
            console.warn('confirmError: ', arguments[0]);
        },
        onSubmit() {
            console.log("send key:", this.confirmationKey);
            this.authServer.registerConfirm(this.confirmationKey, this.confirmAccepted, this.confirmError);
        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/register/confirm/:key', component: RegistrationConfirmationPage, name: 'RegisterCompleted' }));

})(
    ng,
    ng.platform.browser.Title,
    window.app,
    window.app.Server,
    window.app.AuthenticationService
    );