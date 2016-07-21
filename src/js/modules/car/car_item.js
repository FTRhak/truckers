/*global ng:true */

(function (ng, app) {
    app.CarController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/car/index.html',
        directives: [app.MapNavigatorComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function (server, router) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
            }

        }]
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/car/:id/', component: app.CarController, name: 'Car' }));

})(ng, window.app || (window.app = {}));
