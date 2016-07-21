/*global ng:true */

(function (ng, app) {
    app.FreightEditController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/freight/edit.html',
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
    app.routeList.push(new ng.router.Route({ path: '/freight/:id/edit', component: app.FreightEditController, name: 'FreightEdit' }));

})(ng, window.app || (window.app = {}));
