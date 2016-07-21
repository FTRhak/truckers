/*global ng:true */

(function (ng, app) {
    app.FreightController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/freight/index.html',
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
    app.routeList.push(new ng.router.Route({ path: '/freight/:id/', component: app.FreightController, name: 'FreightItem' }));

})(ng, window.app || (window.app = {}));
