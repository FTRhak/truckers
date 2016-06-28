/*global ng:true */

(function (ng, app) {
    app.CarsController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/car/list.html',
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
    app.routeList.push(new ng.router.Route({ path: '/cars', component: app.CarsController, name: 'Cars' }));

})(ng, window.app || (window.app = {}));
