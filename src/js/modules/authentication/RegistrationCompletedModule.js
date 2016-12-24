/*global ng:true */

(function (ng, PageTitle, app, Server, AuthenticationService) {
    'use strict';

    let RegistrationCompletedPage = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: '/templates/authentication/register_completed.html',
        directives: [ng.common.CORE_DIRECTIVES, ng.common.FORM_DIRECTIVES, ng.router.ROUTER_DIRECTIVES],
        providers: [Server, AuthenticationService, PageTitle]
    }).Class({
        constructor: [ng.router.Router, PageTitle, Server, AuthenticationService, function RegistrationCompletedPageConstructor(router, title, server, authServer) {
            if (server.user.isLogin()) {
                router.navigate(['Index']);
            }
            title.setTitle("Register Completed");

        }]
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/register/completed', component: RegistrationCompletedPage, name: 'RegisterCompleted' }));

})(
    ng,
    ng.platform.browser.Title,
    window.app,
    window.app.Server,
    window.app.AuthenticationService
    );