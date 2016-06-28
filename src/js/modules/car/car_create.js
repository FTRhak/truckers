/*global ng:true */

(function (ng, app) {
    app.CarCreateController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/car/edit.html',
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
    app.routeList.push(new ng.router.Route({ path: '/car/create/', component: app.CarCreateController, name: 'Car create' }));

})(ng, window.app || (window.app = {}));
