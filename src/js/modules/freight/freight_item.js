/*global ng:true */

(function (ng, app) {
    app.FreightController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/freight/index.html',
        directives: [app.MapNavigatorComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, function (server) {
            if (!server.user.isLogin()) {
                app.tools.location.go('/login');
            }

        }]
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/freight/:id/', component: app.FreightController, name: 'Freight' }));

})(ng, window.app || (window.app = {}));
