/*global ng:true */

(function (ng, app) {
    app.FreightEditController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/freight/edit.html',
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
    app.routeList.push(new ng.router.Route({ path: '/freight/:id/edit', component: app.FreightEditController, name: 'Freight edit' }));

})(ng, window.app || (window.app = {}));
