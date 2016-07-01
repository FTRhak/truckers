/*global ng:true */

(function (ng, app) {
    'use strict';

    app.LogoutComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/logout.html',
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, function (server) {
            if (!server.user.isLogin()) {
                app.tools.location.go('/login');
                return;
            }
            server.http.post('/api/logout?rid=' + Math.random(), {}, function (res) {
                user.loguot();
                app.tools.location.go('/login');
            });
        }]
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/logout', component: app.LogoutComponent, name: 'Logout' }));

})(ng, window.app || (window.app = {}));
