/*global ng:true */

(function (ng, PageTitle, app, Server, AuthenticationService) {
    'use strict';

    let RestoreComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: '/templates/authentication/restore.html',
        directives: [ng.router.ROUTER_DIRECTIVES],
        providers: [Server, AuthenticationService, PageTitle]
    }).Class({
        constructor: [Server, AuthenticationService, ng.router.Router, PageTitle, function RestoreComponent(server, authServer, router, title) {
            /*if (server.user.isLogin()) {
                router.navigate(['Login']);
            }*/
            title.setTitle("Restore account");
            this.authServer = authServer;
            this.restoreCompleted = false;
            this.errorMessage = "";

        }],
        restoreAccepted: function (data) {
            console.log('restoreAccepted:', data);
            this.restoreCompleted = true;
        },
        restoreError: function (data) {
            console.warn('loginError: ', data);
            this.errorMessage = "Error";
        },
        onSubmit: function (inputEmail) {
            var email = inputEmail.value;
            this.authServer.restore({ email: email }, this.restoreAccepted.bind(this), this.restoreError.bind(this));
        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/restore', component: RestoreComponent, name: 'Restore' }));

})(
    ng,
    ng.platform.browser.Title,
    window.app,
    app.Server,
    window.app.AuthenticationService
    );