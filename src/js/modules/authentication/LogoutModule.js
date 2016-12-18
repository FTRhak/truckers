/*global ng:true */

(function (ng, PageTitle, app, Server, AuthenticationServerComponent) {
    'use strict';

    let LogoutComponent = ng.core.Component({
        selector: 'app-trucker',
        template: `<div>Logout...</div>`,
        providers: [Server, AuthenticationServerComponent, PageTitle]
    }).Class({
        constructor: [Server, AuthenticationServerComponent, ng.router.Router, PageTitle, function (server, authServer, router, title) {
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
    app.routeList.push(new ng.router.Route({ path: '/logout', component: LogoutComponent, name: 'Logout' }));

})(
    ng,
    ng.platform.browser.Title,
    window.app,
    window.app.Server,
    window.app.AuthenticationServerComponent
    );
