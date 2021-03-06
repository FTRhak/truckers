/*global ng:true */

(function (ng, app) {
    app.FreightsController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/freight/list.html',
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
    app.routeList.push(new ng.router.Route({ path: '/freights', component: app.FreightsController, name: 'Freights' }));

})(ng, window.app || (window.app = {}));
