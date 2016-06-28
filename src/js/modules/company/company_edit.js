/*global ng:true */

(function (ng, app) {
    app.CompanyEditController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/company/edit.html',
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
    app.routeList.push(new ng.router.Route({ path: '/company/:id/edit', component: app.CompanyEditController, name: 'Car edit' }));

})(ng, window.app || (window.app = {}));
