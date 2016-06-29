/*global ng:true */

(function (ng, app) {
    app.CompanyDeleteController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/trance_company/delete.html',
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
    app.routeList.push(new ng.router.Route({ path: '/trance-company/:id/delete', component: app.CompanyDeleteController, name: 'Car delete' }));

})(ng, window.app || (window.app = {}));
