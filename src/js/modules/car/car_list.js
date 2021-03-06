/*global ng:true */

(function (ng, app) {
    app.CarsController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/car/list.html',
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
    app.routeList.push(new ng.router.Route({ path: '/cars', component: app.CarsController, name: 'Cars' }));

})(ng, window.app || (window.app = {}));
