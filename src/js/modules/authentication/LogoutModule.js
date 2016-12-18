/*global ng:true */

(function (ng, Component, PageTitle, Route, app, Server, AuthenticationService) {
    'use strict';

    let LogoutPage = Component({
        selector: 'app-trucker',
        template: `<div>Logout...</div>`,
        providers: [Server, AuthenticationService, PageTitle]
    }).Class({
        constructor: [Server, AuthenticationService, ng.router.Router, PageTitle, function LogoutPageConstructor(server, authServer, router, title) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
                return;
            }
            title.setTitle("Logout");
            authServer.logout(function (data) {
                server.user.logout();
                router.navigate(['Login']);
            });
        }]
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new Route({ path: '/logout', component: LogoutPage, name: 'Logout' }));

})(
    ng,
    ng.core.Component,
    ng.platform.browser.Title,
    ng.router.Route,
    window.app,
    window.app.Server,
    window.app.AuthenticationService
    );
