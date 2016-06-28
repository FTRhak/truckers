/*global ng:true */

(function (ng, app) {
    app.CarDeleteController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/car/delete.html',
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
    app.routeList.push(new ng.router.Route({ path: '/car/:id/delete', component: app.CarDeleteController, name: 'Car delete' }));

})(ng, window.app || (window.app = {}));
